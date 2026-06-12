// Sitewide motion vocabulary — one easing family, one stagger rhythm.
// Every animated surface should pull from here instead of inlining values.

/** Signature ease — fast start, long soft landing (expo-out). */
export const EASE = [0.16, 1, 0.3, 1];

/** Snappy spring for hover/tap micro-interactions. */
export const SPRING = { type: 'spring', stiffness: 340, damping: 22, mass: 0.7 };

/** Default whileInView viewport: fire once, slightly before fully on screen. */
export const VIEWPORT = { once: true, margin: '-72px' };

/** Staggered fade-up — pass an index (or seconds) via `custom`. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: EASE },
  }),
};

/** Parent wrapper that staggers any `fadeUp` children. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
