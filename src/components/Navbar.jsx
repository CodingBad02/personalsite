import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedThemeToggler from './AnimatedThemeToggler';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'Writing', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];
  const isActive = (p) => router.pathname === p;

  // Track scroll for navbar appearance changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-[#191818]/10 bg-[#f4f4f4]/82 px-4 backdrop-blur-md transition-shadow duration-300 dark:border-white/10 dark:bg-[#08090f]/82 ${scrolled ? 'shadow-[0_12px_40px_rgba(25,24,24,0.07)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.22)]' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <motion.nav
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto px-0 py-4 transition-all duration-500"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="group relative flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-mono text-sm font-medium tracking-normal text-[#191818] dark:text-[#f2f5ff]"
              >
                manjunathan
                <span className="ml-1 text-[#1b5def] dark:text-[#7cb5ff]">.me</span>
              </motion.div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`relative px-4 py-2 font-mono text-xs transition-all duration-300 ${
                      isActive(link.path)
                        ? 'text-[#191818] dark:text-white'
                        : 'text-[#191818]/58 hover:text-[#191818] dark:text-white/60 dark:hover:text-white'
                    }`}
                  >
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-x-4 bottom-0 h-px bg-[#ff4d2a] dark:bg-[#7cb5ff]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/cli"
                  className={`inline-flex items-center gap-2 border px-3 py-2 text-xs font-mono transition-all duration-300 ${
                    isActive('/cli')
                      ? 'border-[#1b5def] bg-[#1b5def] text-white dark:border-[#7cb5ff] dark:bg-[#7cb5ff] dark:text-[#08090f]'
                      : 'border-[#191818]/15 bg-white/25 text-[#191818]/70 hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]'
                  }`}
                  aria-label="Open CLI"
                >
                  <FiTerminal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">cli</span>
                  <kbd className="hidden sm:inline-flex items-center rounded-md bg-white/30 px-1.5 py-0.5 font-sans text-[10px] font-medium opacity-60">
                    ⌘K
                  </kbd>
                </Link>
              </motion.div>

              <AnimatedThemeToggler
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="group relative flex items-center justify-center border border-[#191818]/15 bg-white/20 p-2.5 text-[#191818]/58 transition-all duration-300 hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/15 dark:bg-white/5 dark:text-white/60 dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]"
              />

              <motion.button
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsOpen((v) => !v)}
                className="md:hidden flex items-center justify-center border border-[#191818]/15 bg-white/20 p-2.5 text-[#191818]/58 transition-all duration-300 hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/15 dark:bg-white/5 dark:text-white/60 dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 mx-auto max-w-4xl overflow-hidden border border-[#191818]/10 bg-[#f4f4f4]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#08090f]/95"
            >
              <div className="px-2 py-3 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`relative block px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive(link.path)
                          ? 'text-[#191818] dark:text-white'
                          : 'text-[#191818]/58 hover:bg-white/50 dark:text-white/60 dark:hover:bg-white/5'
                      }`}
                    >
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="activeTabMobile"
                          className="absolute inset-x-4 bottom-1 h-px bg-[#ff4d2a] dark:bg-[#7cb5ff]"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
