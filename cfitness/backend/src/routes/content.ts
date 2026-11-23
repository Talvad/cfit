import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as db from '../lib/db';
import { HttpError, reply } from '../lib/http';
import type { Body, Ctx } from '../lib/http';
import * as u from '../lib/util';
import type { Achievement, GalleryItem } from '../types';

const s3 = new S3Client({});
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as const;
const CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const FOLDERS = ['gallery', 'achievements'] as const;

async function deleteObject(key?: string): Promise<void> {
  if (!key) return;
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.MEDIA_BUCKET, Key: key }));
  } catch (e) {
    console.warn('Could not delete object', key, (e as Error).message);
  }
}

// ---------------------------------------------------------------- uploads
export async function presign({ body }: Ctx) {
  const folder = u.oneOf(body.folder, FOLDERS, 'folder', { required: true });
  const contentType = u.oneOf(body.contentType, CONTENT_TYPES, 'contentType', { required: true });
  const key = `${folder}/${Date.now()}-${u.uid().slice(0, 8)}.${EXT[contentType]}`;
  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: process.env.MEDIA_BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: 300 }
  );
  return { uploadUrl, key, url: u.mediaUrl(key) };
}

// ---------------------------------------------------------------- gallery
const GALLERY_CATEGORIES = ['Gym Floor', 'Training', 'Events', 'Transformations', 'Community'] as const;
const withUrl = (item: GalleryItem) => ({ ...item, url: u.mediaUrl(item.key) });

export async function listGallery() {
  const items = (await db.scanAll<GalleryItem>(db.T.gallery())).map(withUrl);
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return { items };
}

export async function createGallery({ body }: Ctx) {
  const item: GalleryItem = {
    id: u.uid(),
    key: u.mediaKey(body.key, 'gallery', 'key', { required: true }),
    caption: u.text(body.caption, 'caption', { max: 140 }),
    category: u.oneOf(body.category, GALLERY_CATEGORIES, 'category'),
    createdAt: u.nowIso(),
  };
  await db.put(db.T.gallery(), item);
  return reply(201, withUrl(item));
}

export async function updateGallery({ params, body }: Ctx) {
  const existing = await db.get<GalleryItem>(db.T.gallery(), { id: params.id });
  if (!existing) throw new HttpError(404, 'Image not found');
  const next: GalleryItem = { ...existing };
  if (u.has(body, 'caption')) next.caption = u.text(body.caption, 'caption', { max: 140 });
  if (u.has(body, 'category')) next.category = u.oneOf(body.category, GALLERY_CATEGORIES, 'category');
  await db.put(db.T.gallery(), next);
  return withUrl(next);
}

export async function removeGallery({ params }: Ctx) {
  const existing = await db.get<GalleryItem>(db.T.gallery(), { id: params.id });
  if (existing) {
    await db.del(db.T.gallery(), { id: params.id });
    await deleteObject(existing.key);
  }
  return { ok: true };
}

// ----------------------------------------------------------- achievements
const ACH_CATEGORIES = ['Milestone', 'Competition', 'Transformation', 'Award', 'Community'] as const;
const achWithUrl = (item: Achievement) => ({ ...item, imageUrl: u.mediaUrl(item.imageKey) });

function parseAchievement(b: Body, existing?: Achievement): Partial<Achievement> {
  const create = !existing;
  const want = (k: string) => create || u.has(b, k);
  const out: Partial<Achievement> = {};
  if (want('title')) out.title = u.text(b.title, 'title', { required: true, max: 120 });
  if (want('description')) out.description = u.text(b.description, 'description', { max: 800 });
  if (want('date')) out.date = u.date(b.date, 'date', { required: true });
  if (want('category')) out.category = u.oneOf(b.category, ACH_CATEGORIES, 'category');
  if (want('person')) out.person = u.text(b.person, 'person', { max: 100 });
  if (want('imageKey')) out.imageKey = u.mediaKey(b.imageKey, 'achievements', 'imageKey');
  return out;
}

export async function listAchievements() {
  const items = (await db.scanAll<Achievement>(db.T.achievements())).map(achWithUrl);
  items.sort((a, b) => b.date.localeCompare(a.date));
  return { items };
}

export async function createAchievement({ body }: Ctx) {
  const now = u.nowIso();
  const item = { id: u.uid(), ...parseAchievement(body), createdAt: now, updatedAt: now } as Achievement;
  await db.put(db.T.achievements(), item);
  return reply(201, achWithUrl(item));
}

export async function updateAchievement({ params, body }: Ctx) {
  const existing = await db.get<Achievement>(db.T.achievements(), { id: params.id });
  if (!existing) throw new HttpError(404, 'Achievement not found');
  const data = parseAchievement(body, existing);
  const item: Achievement = { ...existing, ...data, id: existing.id, updatedAt: u.nowIso() };
  await db.put(db.T.achievements(), item);
  if (data.imageKey !== undefined && existing.imageKey && existing.imageKey !== data.imageKey) {
    await deleteObject(existing.imageKey);
  }
  return achWithUrl(item);
}

export async function removeAchievement({ params }: Ctx) {
  const existing = await db.get<Achievement>(db.T.achievements(), { id: params.id });
  if (existing) {
    await db.del(db.T.achievements(), { id: params.id });
    await deleteObject(existing.imageKey);
  }
  return { ok: true };
}
