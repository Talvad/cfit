import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { HttpError, isResponse, reply } from './http';
import type { Body, Claims, Handler } from './http';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEvent = APIGatewayProxyEventV2 | APIGatewayProxyEventV2WithJWTAuthorizer;
export type RouteDefinition = readonly [method: Method, path: string, handler: Handler];

interface Route {
  method: Method;
  re: RegExp;
  names: string[];
  handler: Handler;
}

function compileRoutes(definitions: readonly RouteDefinition[]): Route[] {
  return definitions.map(([method, path, handler]) => {
    const names: string[] = [];
    const pattern = path.replace(/:([a-zA-Z]+)/g, (_, name: string) => {
      names.push(name);
      return '([^/]+)';
    });
    return { method, re: new RegExp(`^${pattern}/?$`), names, handler };
  });
}

function parseBody(event: ApiEvent): Body {
  if (!event.body) return {};
  const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
  if (raw.length > 100_000) throw new HttpError(413, 'Request too large');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new HttpError(400, 'Body must be valid JSON');
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new HttpError(400, 'Body must be a JSON object');
  }
  return parsed as Body;
}

function claimsFrom(event: ApiEvent): Claims {
  if (!('authorizer' in event.requestContext)) return {};
  const authorizer = event.requestContext.authorizer;
  return authorizer && 'jwt' in authorizer ? authorizer.jwt.claims : {};
}

function isAdmin(claims: Claims): boolean {
  const groups = claims['cognito:groups'];
  const value = Array.isArray(groups) ? groups.join(',') : String(groups ?? '');
  return value.split(/[[\],\s]+/).includes('admins');
}

export function createApiHandler(
  definitions: readonly RouteDefinition[],
  options: { adminOnly?: boolean } = {}
): (event: ApiEvent) => Promise<APIGatewayProxyStructuredResultV2> {
  const routes = compileRoutes(definitions);

  return async (event) => {
    try {
      const method = event.requestContext.http.method;
      const path = event.rawPath;
      let matched: Route | undefined;
      let params: Record<string, string> = {};

      for (const route of routes) {
        if (route.method !== method) continue;
        const match = route.re.exec(path);
        if (!match) continue;
        matched = route;
        try {
          params = Object.fromEntries(
            route.names.map((name, index) => [name, decodeURIComponent(match[index + 1])])
          );
        } catch {
          throw new HttpError(400, 'Path contains invalid encoding');
        }
        break;
      }

      if (!matched) throw new HttpError(404, 'Not found');
      const claims = claimsFrom(event);
      if (options.adminOnly && !isAdmin(claims)) throw new HttpError(403, 'Admins only');

      const result = await matched.handler({
        params,
        query: event.queryStringParameters ?? {},
        body: parseBody(event),
        claims,
      });
      return isResponse(result) ? result : reply(200, result ?? { ok: true });
    } catch (error) {
      if (error instanceof HttpError) return reply(error.status, { message: error.message });
      console.error(error);
      return reply(500, { message: 'Something went wrong' });
    }
  };
}
