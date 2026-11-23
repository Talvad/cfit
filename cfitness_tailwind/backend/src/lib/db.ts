import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  type QueryCommandInput,
  type UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

/**
 * Single-table design helpers.
 *
 * Table:  PK (hash) + SK (range)
 * GSI1:   GSI1PK (hash) + GSI1SK (range)  -> "list everything in a collection" and "payments in a month"
 *
 * Every item also stores an `entity` attribute. Internal key attributes are stripped before data leaves this module.
 * See keys.ts for the full list of access patterns.
 */

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
});

const env = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
};
const TABLE = () => env('TABLE_NAME');

// Type aliases (not interfaces) so they are assignable to the SDK's Record<string, ...> key type
export type PrimaryKey = { PK: string; SK: string };
export type Keys = PrimaryKey & { GSI1PK?: string; GSI1SK?: string };
export type Raw = Record<string, unknown> & PrimaryKey;

const INTERNAL = ['PK', 'SK', 'GSI1PK', 'GSI1SK', 'entity'];

export function strip<T>(item: Record<string, unknown>): T {
  const copy: Record<string, unknown> = { ...item };
  for (const k of INTERNAL) delete copy[k];
  return copy as T;
}

export async function getItem<T>(key: PrimaryKey): Promise<T | undefined> {
  const res = await doc.send(new GetCommand({ TableName: TABLE(), Key: key }));
  return res.Item ? strip<T>(res.Item) : undefined;
}

export async function putItem(keys: Keys, entity: string, item: object): Promise<void> {
  await doc.send(new PutCommand({ TableName: TABLE(), Item: { ...item, ...keys, entity } }));
}

export async function deleteItem(key: PrimaryKey): Promise<void> {
  await doc.send(new DeleteCommand({ TableName: TABLE(), Key: key }));
}

export async function deleteMany(keys: PrimaryKey[]): Promise<void> {
  for (let i = 0; i < keys.length; i += 25) {
    await Promise.all(keys.slice(i, i + 25).map((k) => deleteItem({ PK: k.PK, SK: k.SK })));
  }
}

async function runQuery(base: QueryCommandInput): Promise<Raw[]> {
  const items: Raw[] = [];
  let ExclusiveStartKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(new QueryCommand({ ...base, ExclusiveStartKey }));
    items.push(...((res.Items ?? []) as Raw[]));
    ExclusiveStartKey = res.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

/** All items under one partition key (optionally only sort keys starting with a prefix). Raw: keys are kept. */
export function queryRaw(pk: string, opts: { skPrefix?: string; forward?: boolean } = {}): Promise<Raw[]> {
  const { skPrefix, forward = true } = opts;
  return runQuery({
    TableName: TABLE(),
    KeyConditionExpression: skPrefix ? 'PK = :pk AND begins_with(SK, :sk)' : 'PK = :pk',
    ExpressionAttributeValues: skPrefix ? { ':pk': pk, ':sk': skPrefix } : { ':pk': pk },
    ScanIndexForward: forward,
  });
}

/** All items in a GSI1 partition (a "collection"), already ordered by GSI1SK. */
export async function queryIndex<T>(
  gsi1pk: string,
  opts: {
    forward?: boolean;
    filter?: { expression: string; names: Record<string, string>; values: Record<string, unknown> };
  } = {}
): Promise<T[]> {
  const { forward = true, filter } = opts;
  const rows = await runQuery({
    TableName: TABLE(),
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :gpk',
    ExpressionAttributeValues: { ':gpk': gsi1pk, ...(filter?.values ?? {}) },
    ...(filter ? { FilterExpression: filter.expression, ExpressionAttributeNames: filter.names } : {}),
    ScanIndexForward: forward,
  });
  return rows.map((r) => strip<T>(r));
}

export const update = (params: Omit<UpdateCommandInput, 'TableName'>) =>
  doc.send(new UpdateCommand({ TableName: TABLE(), ...params }));
