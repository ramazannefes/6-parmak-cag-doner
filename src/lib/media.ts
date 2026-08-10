import { useEffect, useState } from 'react';

const cache = new Map<string, boolean>();

const MEDIA_TYPES = ['image/', 'video/', 'application/octet-stream'];

async function headOk(src: string): Promise<boolean> {
  const hit = cache.get(src);
  if (hit !== undefined) return hit;
  try {
    const r = await fetch(src, { method: 'HEAD' });
    const ct = r.headers.get('content-type') || '';
    const ok = r.ok && MEDIA_TYPES.some((t) => ct.startsWith(t));
    cache.set(src, ok);
    return ok;
  } catch {
    cache.set(src, false);
    return false;
  }
}

export async function resolveMedia(candidates: string[], fallback: string): Promise<string> {
  for (const c of candidates) {
    if (await headOk(c)) return c;
  }
  return fallback;
}

export function useMedia(candidates: string[], fallback: string): string {
  const [src, setSrc] = useState(fallback);
  const key = `${candidates.join('|')}||${fallback}`;
  useEffect(() => {
    let live = true;
    resolveMedia(candidates, fallback).then((s) => {
      if (live) setSrc(s);
    });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return src;
}
