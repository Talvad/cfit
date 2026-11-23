import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { HttpError, isResponse, reply } from './lib/http';
import type { Body, Claims, Handler } from './lib/http';
import * as content from './routes/content';
import * as enquiries from './routes/enquiries';
import * as fees from './routes/fees';
import * as members from './routes/members';
import * as pricing from './routes/pricing';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RouteDef = readonly [method: Method, path: string, handler: Handler, isPublic?: boolean];

const ROUTE_DEFS: RouteDef[] = [
  // ---- public website
  ['GET', '/public/pricing', pricing.listPublic, true],
  ['GET', '/public/gallery', content.listGallery, true],
  ['GET', '/public/achievements', content.listAchievements, true],
  ['POST', '/public/enquiries', enquiries.submit, true],

  // ---- admin
  ['GET', '/admin/me', ({ claims }) => ({ email: claims.email, groups: claims['cognito:groups'] })],
  ['GET', '/admin/dashboard', fees.dashboard],

  ['GET', '/admin/members', members.list],
  ['POST', '/admin/members', members.create],
  ['GET', '/admin/members/:id', members.getOne],
  ['PUT', '/admin/members/:id', members.updateOne],
  ['DELETE', '/admin/members/:id', members.remove],
  ['POST', '/admin/members/:id/payments', fees.addPayment],

  ['GET', '/admin/fees', fees.fees],
  ['DELETE', '/admin/payments/:month/:memberId/:entryId', fees.removeEntry],

  ['GET', '/admin/pricing', pricing.listAdmin],
  ['POST', '/admin/pricing', pricing.create],
  ['PUT', '/admin/pricing/:id', pricing.updateOne],
  ['DELETE', '/admin/pricing/:id', pricing.remove],

  ['GET', '/admin/gallery', content.listGallery],
  ['POST', '/admin/gallery', content.createGallery],
  ['PUT', '/admin/gallery/:id', content.updateGallery],
  ['DELETE', '/admin/gallery/:id', content.removeGallery],

  ['GET', '/admin/achievements', content.listAchievements],
  ['POST', '/admin/achievements', content.createAchievement],
  ['PUT', '/admin/achievements/:id', content.updateAchievement],
  ['DELETE', '/admin/achievements/:id', content.removeAchievement],

  ['GET', '/admin/enquiries', enquiries.list],
  ['PUT', '/admin/enquiries/:id', enquiries.updateStatus],
  ['DELETE', '/admin/enquiries/:id', enquiries.remove],

  ['POST', '/admin/uploads/presign', content.presign],
];

interface Route {
  method: Method;
  re: RegExp;
  names: string[];
  handler: Handler;
  isPublic: boolean;
}

const ROUTES: Route[] = ROUTE_DEFS.map(([method, path, handler, isPublic = false]) => {
  const names: string[] = [];
  const pattern = path.replace(/:([a-zA-Z]+)/g, (_, n: string) => {
    names.push(n);
    return '([^/]+)';
  });
  return { method, re: new RegExp(`^${pattern}/?$`), names, handler, isPublic };
});

// Being signed in is not enough: the user must be in the "admins" Cognito group.
function isAdmin(claims: Claims): boolean {
  const g = claims['cognito:groups'];
  const s = Array.isArray(g) ? g.join(',') : String(g ?? '');
  return s.split(/[[\],\s]+/).includes('admins');
}

function parseBody(event: APIGatewayProxyEventV2WithJWTAuthorizer): Body {
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

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    const method = event.requestContext.http.method;
    const path = event.rawPath;

    let matched: Route | undefined;
    let params: Record<string, string> = {};
    for (const r of ROUTES) {
      if (r.method !== method) continue;
      const m = r.re.exec(path);
      if (m) {
        matched = r;
        params = Object.fromEntries(r.names.map((n, i) => [n, decodeURIComponent(m[i + 1])]));
        break;
      }
    }
    if (!matched) throw new HttpError(404, 'Not found');

    const claims: Claims = event.requestContext.authorizer?.jwt?.claims ?? {};
    if (!matched.isPublic && !isAdmin(claims)) throw new HttpError(403, 'Admins only');

    const result = await matched.handler({
      params,
      query: event.queryStringParameters ?? {},
      body: parseBody(event),
      claims,
    });
    return isResponse(result) ? result : reply(200, result ?? { ok: true });
  } catch (err) {
    if (err instanceof HttpError) return reply(err.status, { message: err.message });
    console.error(err);
    return reply(500, { message: 'Something went wrong' });
  }
};
