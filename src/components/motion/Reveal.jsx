import React from 'react';
import { motion } from 'framer-motion';
import { EASE, VIEWPORT } from '../../utils/motion';

/**
 * Reveal — the one scroll-entrance used across the site.
 * Fades + rises into place the first time it scrolls into view.
 *
 * <Reveal delay={0.1}>...</Reveal>
 * <Reveal as="section" y={32}>...</Reveal>
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 22,
  duration = 0.65,
  className = '',
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
