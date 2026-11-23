# CFitness

Gym website + admin dashboard.

- `web/` Next.js 14 (App Router, TypeScript). Public site (Home, Achievements, Pricing, Gallery) and `/admin` dashboard.
- `backend/` AWS SAM: Cognito (admin only), DynamoDB, HTTP API Gateway with JWT authorizer, S3 + CloudFront for images, one Node 20 Lambda written in **TypeScript** (`backend/src/app.ts`). `sam build` compiles it with esbuild, so there is no separate build step. Run `npm install && npm run typecheck` inside `backend/src` for full type checking.

## 1. Deploy the backend

```bash
cd backend
sam build
sam deploy --guided        # first time. Set AllowedOrigins to your site URLs, e.g.
                           # https://cfitness.vercel.app,http://localhost:3000
```

Note the stack outputs: `ApiUrl`, `UserPoolId`, `UserPoolClientId`, `MediaBaseUrl`.

### Create your admin user (nobody can sign up on their own)

```bash
POOL=<UserPoolId>
aws cognito-idp admin-create-user --user-pool-id $POOL --username you@example.com \
  --user-attributes Name=email,Value=you@example.com Name=email_verified,Value=true
aws cognito-idp admin-add-user-to-group --user-pool-id $POOL --username you@example.com --group-name admins
```

Cognito emails a temporary password. On first login the dashboard asks you to choose a new one.

## 2. Run the website

```bash
cd web
cp .env.example .env.local   # fill in the 3 values from the stack outputs
npm install
npm run dev                  # http://localhost:3000   ·   admin: /admin
```

Optional: set `NEXT_PUBLIC_MEDIA_HOST` (CloudFront domain, no https://) if you later switch to `next/image`.

On Vercel add the same three `NEXT_PUBLIC_*` variables, then add your Vercel URL to `AllowedOrigins` and redeploy the stack.

## How admin-only access works

1. Sign-up is disabled in Cognito (`AllowAdminCreateUserOnly`).
2. Every `/admin/*` API route needs a valid Cognito JWT (API Gateway authorizer) **and** membership of the `admins` group (checked again in the Lambda).
3. The dashboard UI redirects to `/admin/login` without an admin session. The real protection is steps 1-2, not the UI.
4. Only `/public/*` routes are open: pricing, gallery, achievements (read) and the enquiry form (write).

## What's included

| Area | Features |
|---|---|
| Public site | Home, Pricing, Achievements, Gallery (filters + lightbox), free-trial enquiry form, WhatsApp link. Shows sample content until you add real data. Changes appear within ~60 s. |
| Members | Add / edit / delete; auto ID `CF-0001`; program (Cardio, Personal Training, Cardio + PT, General); plan picker auto-fills fee; joining date; fee due day; trainer; emergency contact; notes; status (active / paused / left); search, filters, CSV export |
| Fees | Record payments per month (partial payments supported, mode, date, note), remove wrong entries, payment history per member |
| Pending | Month view of who is paid / partial / pending / overdue, totals, one-tap WhatsApp reminder, CSV export |
| Pricing | Add, edit, delete, show/hide, "most popular", display order |
| Gallery | Multi-image upload straight to S3, categories, captions, edit, delete |
| Achievements | Add, edit, delete, optional photo |
| Extras I added | Dashboard (collections, 6-month trend, program split, recent payments, due soon), enquiry inbox with status tracking, member status instead of hard delete, CSV exports |

## Notes and assumptions

- A member owes the monthly fee from their joining month while their status is `active`. Set `paused` or `left` to stop charging; past payment records are kept.
- Overdue = balance remaining after the due day. "Today" uses `GymUtcOffsetMinutes` (default 330, India).
- Fees are not auto-generated each month: the pending list is calculated live, so there are no monthly jobs to maintain.
- DynamoDB scans are used for lists. That is fine for a few thousand members; add GSIs if you grow far beyond that.
- Members, payments and counters tables have `DeletionPolicy: Retain` and point-in-time recovery.
- Not included yet: SMS/WhatsApp automation, online payments, attendance check-in, expiry-based memberships (quarterly/yearly). Easy to add next.
