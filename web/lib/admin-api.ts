import { API_URL } from './public-api';
import { getAccessToken, signOut } from './auth';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T = unknown>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  if (!API_URL) throw new ApiError('NEXT_PUBLIC_API_URL is not set', 0);
  const token = await getAccessToken();
  if (!token) {
    signOut();
    if (typeof window !== 'undefined') window.location.replace('/admin/login');
    throw new ApiError('Your session has expired', 401);
  }
  const res = await fetch(`${API_URL}/admin${path}`, {
    method: opts.method || 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const data: unknown = await res.json().catch(() => undefined);
  if (res.status === 401) {
    signOut();
    if (typeof window !== 'undefined') window.location.replace('/admin/login');
  }
  if (!res.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string'
        ? data.message
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  if (data === undefined) throw new ApiError('The API returned an invalid response', res.status);
  return data as T;
}

const MAX_BYTES = 8 * 1024 * 1024;

// Uploads straight to S3 with a short-lived presigned URL, returns the S3 key to save with the record.
export async function uploadImage(file: File, folder: 'gallery' | 'achievements'): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error(`${file.name}: only JPG, PNG or WebP images are allowed`);
  }
  if (file.size > MAX_BYTES) throw new Error(`${file.name}: image is larger than 8 MB`);
  const { uploadUrl, key } = await api<{ uploadUrl: string; key: string }>('/uploads/presign', {
    method: 'POST',
    body: { folder, contentType: file.type },
  });
  const res = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
  if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
  return key;
}
