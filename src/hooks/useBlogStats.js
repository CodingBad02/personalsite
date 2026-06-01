// src/hooks/useBlogStats.js
// View counter + multi-heart with optimistic UI, debounced server flush, and a
// localStorage fallback when the datastore (Upstash) isn't configured yet.
import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_HEARTS = 16; // per visitor, per post

export default function useBlogStats(slug) {
  const [hits, setHits] = useState(null);
  const [hearts, setHearts] = useState(0);
  const [you, setYou] = useState(0);
  const [available, setAvailable] = useState(true);

  const youRef = useRef(0);
  const pending = useRef(0);
  const timer = useRef(null);
  const availRef = useRef(true);

  const flush = useCallback(async () => {
    const delta = pending.current;
    pending.current = 0;
    if (delta <= 0) return;
    if (availRef.current) {
      try {
        const r = await fetch(`/api/blog/${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'heart', delta }),
        });
        const j = await r.json();
        if (j?.hearts != null) setHearts(j.hearts + pending.current);
      } catch { /* keep optimistic value */ }
    } else {
      const g = Number(localStorage.getItem(`hearts_global_${slug}`) || 0) + delta;
      localStorage.setItem(`hearts_global_${slug}`, String(g));
      setHearts(g + pending.current);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const y = Number(localStorage.getItem(`hearts_you_${slug}`) || 0);
    youRef.current = y;
    setYou(y);

    (async () => {
      try {
        const r = await fetch(`/api/blog/${slug}`);
        const d = await r.json();
        if (cancelled) return;
        const viewKey = `viewed_${slug}`;
        const firstView = !sessionStorage.getItem(viewKey);

        if (d?.available) {
          setAvailable(true); availRef.current = true;
          setHearts(d.hearts || 0);
          if (firstView) {
            sessionStorage.setItem(viewKey, '1');
            const vr = await fetch(`/api/blog/${slug}`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type: 'view' }),
            });
            const vd = await vr.json();
            if (!cancelled) setHits(vd?.hits ?? d.hits ?? 0);
          } else setHits(d.hits || 0);
        } else {
          setAvailable(false); availRef.current = false;
          const hk = `hits_${slug}`;
          let h = Number(localStorage.getItem(hk) || 0);
          if (firstView) { sessionStorage.setItem(viewKey, '1'); h += 1; localStorage.setItem(hk, String(h)); }
          setHits(h);
          setHearts(Number(localStorage.getItem(`hearts_global_${slug}`) || y));
        }
      } catch {
        if (!cancelled) { setAvailable(false); availRef.current = false; setHits(0); }
      }
    })();

    return () => { cancelled = true; };
  }, [slug]);

  const addHeart = useCallback(() => {
    if (youRef.current >= MAX_HEARTS) return;
    youRef.current += 1;
    setYou(youRef.current);
    localStorage.setItem(`hearts_you_${slug}`, String(youRef.current));
    setHearts((h) => h + 1); // optimistic
    pending.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(flush, 700);
  }, [slug, flush]);

  // flush any pending hearts when leaving
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); flush(); }, [flush]);

  return { hits, hearts, you, max: MAX_HEARTS, atMax: you >= MAX_HEARTS, addHeart, available };
}
