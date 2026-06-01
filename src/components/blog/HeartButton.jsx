import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HEART = '#FF5C8A';

export default function HeartButton({ hearts = 0, you = 0, atMax = false, onAdd }) {
  const [floaters, setFloaters] = useState([]);
  const idRef = useRef(0);

  const click = () => {
    if (atMax) return;
    onAdd();
    const id = ++idRef.current;
    const x = Math.random() * 36 - 18;
    setFloaters((f) => [...f, { id, x }]);
    setTimeout(() => setFloaters((f) => f.filter((z) => z.id !== id)), 900);
  };

  return (
    <div className="inline-flex items-center gap-3">
      <button
        onClick={click}
        disabled={atMax}
        aria-label="Give this post a heart"
        className="group relative inline-flex items-center gap-2 rounded-full border border-line-light dark:border-line-dark px-4 py-2 transition-all hover:border-[#FF5C8A] active:scale-95 disabled:opacity-60 disabled:active:scale-100"
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
          </AnimatePresence>
        </span>
        <span className="text-sm font-mono tabular-nums">{hearts}</span>
      </button>
      {you > 0 && (
        <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
          you · {you}{atMax ? ' · max' : ''}
        </span>
      )}
    </div>
  );
}
