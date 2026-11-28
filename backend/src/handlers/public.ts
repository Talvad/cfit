import * as content from '../routes/content';
import * as enquiries from '../routes/enquiries';
import * as pricing from '../routes/pricing';
import { createApiHandler } from '../lib/router';

export const handler = createApiHandler([
  ['GET', '/public/pricing', pricing.listPublic],
  ['GET', '/public/gallery', content.listGallery],
  ['GET', '/public/achievements', content.listAchievements],
  ['POST', '/public/enquiries', enquiries.submit],
]);
