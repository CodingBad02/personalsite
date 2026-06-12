import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin scroll-progress bar pinned above the navbar (blog posts). */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#1b5def] dark:bg-[#7cb5ff]"
    />
  );
}
