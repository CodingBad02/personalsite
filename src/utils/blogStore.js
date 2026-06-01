// src/utils/blogStore.js — server-only Upstash Redis adapter for blog hits + hearts.
// Returns null from every function when Redis isn't configured, so the API/client
// can gracefully fall back to localStorage.
import { Redis } from '@upstash/redis';

export const MAX_HEARTS_PER_REQUEST = 10;

let _redis; // undefined = not initialized, null = unavailable
function client() {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

export function isConfigured() {
  return client() !== null;
}

export async function getStats(slug) {
  const r = client();
  if (!r) return null;
  const [hits, hearts] = await r.mget(`hits:${slug}`, `hearts:${slug}`);
  return { hits: Number(hits) || 0, hearts: Number(hearts) || 0 };
}

export async function addView(slug) {
  const r = client();
  if (!r) return null;
  return await r.incr(`hits:${slug}`);
}

export async function addHearts(slug, n) {
  const r = client();
  if (!r) return null;
  const delta = Math.max(1, Math.min(MAX_HEARTS_PER_REQUEST, Number(n) || 1));
  return await r.incrby(`hearts:${slug}`, delta);
}
