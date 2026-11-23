import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

export const authConfigured = Boolean(
  process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID && process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
);

let pool: CognitoUserPool | null = null;
function getPool() {
  if (!pool) {
    pool = new CognitoUserPool({
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
    });
  }
  return pool;
}

let pendingUser: CognitoUser | null = null;

// Only members of the Cognito "admins" group may use the dashboard.
// (The API enforces this again on every request, this check just gives a clear UI.)
export function isAdminSession(session: CognitoUserSession) {
  const groups = session.getIdToken().payload['cognito:groups'] || [];
  return Array.isArray(groups) && groups.includes('admins');
}

export type SignInResult = { status: 'ok' } | { status: 'new-password' };

function finish(user: CognitoUser, session: CognitoUserSession, resolve: (r: SignInResult) => void, reject: (e: Error) => void) {
  if (!isAdminSession(session)) {
    user.signOut();
    reject(new Error('This account is not an administrator.'));
    return;
  }
  resolve({ status: 'ok' });
}

export function signIn(email: string, password: string): Promise<SignInResult> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email.trim().toLowerCase(), Pool: getPool() });
    user.authenticateUser(
      new AuthenticationDetails({ Username: email.trim().toLowerCase(), Password: password }),
      {
        onSuccess: (session) => finish(user, session, resolve, reject),
        onFailure: (err) => reject(new Error(err.message || 'Could not sign in')),
        // First login with the temporary password Cognito emailed
        newPasswordRequired: () => {
          pendingUser = user;
          resolve({ status: 'new-password' });
        },
      }
    );
  });
}

export function completeNewPassword(newPassword: string): Promise<SignInResult> {
  return new Promise((resolve, reject) => {
    if (!pendingUser) return reject(new Error('Please sign in again'));
    const user = pendingUser;
    user.completeNewPasswordChallenge(newPassword, {}, {
      onSuccess: (session) => {
        pendingUser = null;
        finish(user, session, resolve, reject);
      },
      onFailure: (err) => reject(new Error(err.message || 'Could not set password')),
    });
  });
}

export function getSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve) => {
    if (!authConfigured) return resolve(null);
    const user = getPool().getCurrentUser();
    if (!user) return resolve(null);
    // getSession also refreshes expired tokens using the refresh token
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      resolve(!err && session && session.isValid() ? session : null);
    });
  });
}

export async function getAccessToken() {
  const s = await getSession();
  return s ? s.getAccessToken().getJwtToken() : null;
}

export function sessionEmail(s: CognitoUserSession) {
  return (s.getIdToken().payload.email as string) || '';
}

export function signOut() {
  if (authConfigured) getPool().getCurrentUser()?.signOut();
}
