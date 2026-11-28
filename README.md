# CFitness

CFitness is a gym landing page and staff membership manager.

## V1 scope

- Public Next.js site: Home, Pricing, Gallery, Achievements, and free-trial enquiries.
- Staff-only admin: members and membership plans, offline fee/payment records, enquiry inbox, gallery, and achievements.
- No member self-service accounts or online payments in v1.

## Project layout

- `web/` — Next.js 16 App Router, React, Tailwind CSS 4. Host the frontend on Vercel.
- `backend/` — AWS SAM TypeScript Lambda, API Gateway HTTP API, Cognito, DynamoDB, S3, and CloudFront.

The backend uses separate public and admin Lambda functions. The public function can query published content and create enquiries; the admin function handles membership operations and media management behind API Gateway JWT authorization and an additional `admins` group check. Both use the same DynamoDB table and shared domain modules.

## Local development

Install the frontend dependencies from the lockfile and provide local configuration:

```sh
cd web
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Set these values in `web/.env.local`:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | API Gateway URL from the SAM stack output |
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | Cognito user-pool ID from the SAM stack output |
| `NEXT_PUBLIC_COGNITO_CLIENT_ID` | Cognito app-client ID from the SAM stack output |

Never put credentials, tokens, or real secrets in `.env.example` or commit `.env.local`.

Backend dependencies and TypeScript checks:

```sh
cd backend/src
npm install
npm run typecheck
sam validate --lint --template-file ../template.yaml
npm run build
```

## Deployment outline

The backend template defines the API and data services; its outputs include the API URL and Cognito IDs needed by the frontend. Set `AllowedOrigins` to the exact Vercel site origin(s), including the local development origin where needed. Configure those outputs as Vercel environment variables and deploy the frontend from `web/`.

The Cognito user pool does not allow self-registration. Create an administrator through the AWS administrative workflow and add that user to the `admins` group. API Gateway JWT authorization and the Lambda's group check both protect admin operations.

Do not deploy until the AWS account, region, stack name, Vercel project, and environment are confirmed. Review the SAM change set before applying infrastructure changes. The DynamoDB table is retained and point-in-time recovery is enabled.

## Business content to replace

`web/lib/site.ts` still contains example contact details and should be updated with verified gym information. Review the sample plans and achievements in `web/lib/seed.ts`; publish real prices and claims only after approval. Keep sample content out of the production site when no approved values are available.
