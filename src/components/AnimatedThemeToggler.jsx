import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../utils/theme-context';

/**
 * Magic UI — animated-theme-toggler, ported for this project.
 * Reveals the new theme with a circular wipe expanding from the button center,
 * using the View Transitions API (falls back to an instant swap when unsupported).
 */
export default function AnimatedThemeToggler({ className = '', ...motionProps }) {
  const ref = useRef(null);
  const { toggleTheme } = useTheme();

  const handleClick = () => {
    const el = ref.current;
    if (!el) {
      toggleTheme();
      return;
    }
    const { top, left, width, height } = el.getBoundingClientRect();
    toggleTheme({ x: left + width / 2, y: top + height / 2 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      aria-label="Toggle theme"
      className={className}
      {...motionProps}
    >
      <FiSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </motion.button>
  );
}
