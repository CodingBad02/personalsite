import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero image reveal: starts as a low-quality (blurred) version, a bright scan
 * line sweeps top→bottom turning it sharp behind the line, while the whole
 * frame eases from a slight zoom back into place. Plays once on mount.
 */
export default function HeroImageReveal({
  src,
  alt = '',
  className = '',
  objectPosition = '52% 50%',
  duration = 1.7,
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ scale: 1.06 }}
      animate={{ scale: 1 }}
      transition={{ duration: duration + 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* low-quality base */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.05] object-cover blur-2xl saturate-[0.6] brightness-95"
        style={{ objectPosition }}
      />

      {/* sharp layer, revealed top→bottom */}
      <motion.img
        src={src}
        alt={alt}
        className="relative h-full w-full object-cover"
        style={{ objectPosition }}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration, ease: 'easeInOut' }}
      />

      {/* scan line riding the reveal boundary */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{ boxShadow: '0 0 18px 5px rgba(124,181,255,0.7)' }}
        initial={{ top: '0%', opacity: 0 }}
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
