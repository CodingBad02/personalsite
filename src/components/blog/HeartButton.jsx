import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HEART = '#FF5C8A';
const BURST_COLORS = ['#FF5C8A', '#1b5def', '#7cb5ff', '#ffb84d'];

export default function HeartButton({ hearts = 0, you = 0, atMax = false, onAdd }) {
  const [floaters, setFloaters] = useState([]);
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);

  const click = () => {
    if (atMax) return;
    onAdd();
    const id = ++idRef.current;
    const x = Math.random() * 36 - 18;
    // confetti ring: 7 particles at even angles with a little jitter
    const particles = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.6;
      const dist = 26 + Math.random() * 18;
      return {
        key: `${id}-${i}`,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: BURST_COLORS[i % BURST_COLORS.length],
      };
    });
    setFloaters((f) => [...f, { id, x }]);
    setBursts((b) => [...b, { id, particles }]);
    setTimeout(() => {
      setFloaters((f) => f.filter((z) => z.id !== id));
      setBursts((b) => b.filter((z) => z.id !== id));
    }, 900);
  };

  return (
    <div className="inline-flex items-center gap-3">
      <motion.button
        onClick={click}
        disabled={atMax}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        aria-label="Give this post a heart"
        className="group relative inline-flex items-center gap-2 rounded-full border border-[#191818]/15 px-4 py-2 transition-colors hover:border-[#FF5C8A] disabled:opacity-60 dark:border-white/15"
      >
        <span className="relative">
          <FaHeart className={`h-4 w-4 transition-colors ${you > 0 ? 'text-[#FF5C8A]' : 'text-gray-400 group-hover:text-[#FF5C8A]'}`} />
          <AnimatePresence>
            {floaters.map((f) => (
              <motion.span
                key={f.id}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -42, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ x: f.x }}
                className="pointer-events-none absolute left-0 top-0"
              >
                <FaHeart className="h-4 w-4" style={{ color: HEART }} />
              </motion.span>
            ))}
            {bursts.flatMap((b) =>
              b.particles.map((p) => (
                <motion.span
                  key={p.key}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundColor: p.color }}
                  className="pointer-events-none absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
                />
              ))
            )}
          </AnimatePresence>
        </span>
        <span className="text-sm font-mono tabular-nums">{hearts}</span>
      </motion.button>
      {you > 0 && (
        <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
          you · {you}{atMax ? ' · max' : ''}
        </span>
      )}
    </div>
  );
}
