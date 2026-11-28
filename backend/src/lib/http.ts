import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}

export const reply = (statusCode: number, data: unknown): APIGatewayProxyStructuredResultV2 => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

export type Body = Record<string, unknown>;
export type Claims = Record<string, unknown>;

export interface Ctx {
  params: Record<string, string>;
  query: Record<string, string | undefined>;
  body: Body;
  claims: Claims;
}

/** A handler may return plain data (sent as 200) or a ready-made response (e.g. reply(201, ...)). */
export type Handler = (ctx: Ctx) => Promise<unknown> | unknown;

export const isResponse = (v: unknown): v is APIGatewayProxyStructuredResultV2 =>
  typeof v === 'object' && v !== null && typeof (v as { statusCode?: unknown }).statusCode === 'number';
