import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}=+*^?#';
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * EncryptedText — ported (no shadcn). Renders `text` scrambled, then reveals it
 * character-by-character once it scrolls into view.
 *
 * Initial render (pre-mount / pre-trigger) shows the real text so SSR and the
 * first client render match — scrambling only kicks in client-side after the
 * IntersectionObserver fires.
 */
export function EncryptedText({
  text,
  revealDelayMs = 50,
  encryptedClassName = 'text-[#191818]/25 dark:text-white/25',
  revealedClassName = '',
  className = '',
  as: Tag = 'span',
}) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [, setTick] = useState(0);

  // Trigger on scroll-into-view (once).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Progressive reveal.
  useEffect(() => {
    if (!started) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRevealedCount(i);
      if (i >= text.length) clearInterval(id);
    }, revealDelayMs);
    return () => clearInterval(id);
  }, [started, text, revealDelayMs]);

  // Scramble unrevealed characters.
  useEffect(() => {
    if (!started) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 45);
    return () => clearInterval(id);
  }, [started]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, idx) => {
        if (ch === ' ') return <span key={idx}>&nbsp;</span>;
        const show = !started || idx < revealedCount;
        return (
          <span key={idx} aria-hidden="true" className={show ? revealedClassName : encryptedClassName}>
            {show ? ch : rand()}
          </span>
        );
      })}
    </Tag>
  );
}

export default EncryptedText;
