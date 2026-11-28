import * as content from '../routes/content';
import * as enquiries from '../routes/enquiries';
import * as fees from '../routes/fees';
import * as members from '../routes/members';
import * as pricing from '../routes/pricing';
import { createApiHandler } from '../lib/router';

export const handler = createApiHandler(
  [
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
  ],
  { adminOnly: true }
);
