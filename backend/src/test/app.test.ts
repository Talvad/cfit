import assert from 'node:assert/strict';
import test from 'node:test';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { handler as adminHandler } from '../handlers/admin';
import { handler as publicHandler } from '../handlers/public';

function makeEvent(
  method: string,
  rawPath: string,
  options: { body?: string; claims?: Record<string, unknown> } = {}
): APIGatewayProxyEventV2WithJWTAuthorizer {
  return {
    version: '2.0',
    routeKey: `${method} ${rawPath}`,
    rawPath,
    rawQueryString: '',
    headers: {},
    requestContext: {
      http: {
        method,
        path: rawPath,
        protocol: 'HTTP/1.1',
        sourceIp: '127.0.0.1',
        userAgent: 'test',
      },
      authorizer: options.claims
        ? { jwt: { claims: options.claims, scopes: [] } }
        : undefined,
    },
    isBase64Encoded: false,
    ...(options.body === undefined ? {} : { body: options.body }),
  } as unknown as APIGatewayProxyEventV2WithJWTAuthorizer;
}

test('rejects admin routes unless the authenticated user belongs to admins', async () => {
  const response = await adminHandler(makeEvent('GET', '/admin/me'));

  assert.equal(response.statusCode, 403);
  assert.deepEqual(JSON.parse(response.body ?? ''), { message: 'Admins only' });
});

test('allows an admin-group user through the protected route boundary', async () => {
  const response = await adminHandler(
    makeEvent('GET', '/admin/me', {
      claims: { 'cognito:groups': ['admins'], email: 'admin@example.com' },
    })
  );

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body ?? ''), {
    email: 'admin@example.com',
    groups: ['admins'],
  });
});

test('keeps the public enquiry endpoint reachable without admin claims', async () => {
  const response = await publicHandler(
    makeEvent('POST', '/public/enquiries', {
      body: JSON.stringify({ website: 'bot' }),
    })
  );

  assert.equal(response.statusCode, 201);
  assert.deepEqual(JSON.parse(response.body ?? ''), { ok: true });
});

test('does not expose admin routes through the public handler', async () => {
  const response = await publicHandler(makeEvent('GET', '/admin/members'));

  assert.equal(response.statusCode, 404);
});

test('returns client errors for malformed or oversized bodies', async () => {
  const malformed = await publicHandler(makeEvent('POST', '/public/enquiries', { body: '{' }));
  const oversized = await publicHandler(
    makeEvent('POST', '/public/enquiries', { body: 'x'.repeat(100_001) })
  );

  assert.equal(malformed.statusCode, 400);
  assert.equal(oversized.statusCode, 413);
});

test('returns not found for an unregistered route', async () => {
  const response = await adminHandler(makeEvent('GET', '/admin/not-a-route'));

  assert.equal(response.statusCode, 404);
});
