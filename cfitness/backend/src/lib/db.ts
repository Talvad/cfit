import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  type QueryCommandInput,
  type ScanCommandInput,
  type UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
});

export async function get<T>(TableName: string, Key: Record<string, unknown>): Promise<T | undefined> {
  const res = await doc.send(new GetCommand({ TableName, Key }));
  return res.Item as T | undefined;
}

export const put = (TableName: string, Item: object) => doc.send(new PutCommand({ TableName, Item }));

export const del = (TableName: string, Key: Record<string, unknown>) =>
  doc.send(new DeleteCommand({ TableName, Key }));

export const update = (params: UpdateCommandInput) => doc.send(new UpdateCommand(params));

export async function scanAll<T>(TableName: string, extra: Partial<ScanCommandInput> = {}): Promise<T[]> {
  const items: T[] = [];
  let ExclusiveStartKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(new ScanCommand({ TableName, ExclusiveStartKey, ...extra }));
    items.push(...((res.Items ?? []) as T[]));
    ExclusiveStartKey = res.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

export async function queryAll<T>(params: QueryCommandInput): Promise<T[]> {
  const items: T[] = [];
  let ExclusiveStartKey: Record<string, unknown> | undefined;
  do {
    const res = await doc.send(new QueryCommand({ ...params, ExclusiveStartKey }));
    items.push(...((res.Items ?? []) as T[]));
    ExclusiveStartKey = res.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

const env = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
};

export const T = {
  members: () => env('MEMBERS_TABLE'),
  payments: () => env('PAYMENTS_TABLE'),
  pricing: () => env('PRICING_TABLE'),
  gallery: () => env('GALLERY_TABLE'),
  achievements: () => env('ACHIEVEMENTS_TABLE'),
  enquiries: () => env('ENQUIRIES_TABLE'),
  counters: () => env('COUNTERS_TABLE'),
};
