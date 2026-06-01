import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi';

const socials = [
  { href: 'https://github.com/CodingBad02', label: 'GitHub', Icon: FiGithub },
  { href: 'https://www.linkedin.com/in/manjunathan-r-06396b1b7/', label: 'LinkedIn', Icon: FiLinkedin },
  { href: 'https://www.instagram.com/koffeewith.ai?igsh=MXF4bTk2MnB5Mzd3cA==', label: 'Instagram', Icon: FiInstagram },
  { href: 'mailto:manjunathan.ai02@gmail.com', label: 'Email', Icon: FiMail },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Superhuman mesh glow */}
      <div className="mesh-hero pointer-events-none absolute inset-0 -z-10" />
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary-light/10 dark:bg-primary-dark/20 blur-3xl -z-10 animate-float" />

      <div className="container-narrow pt-40 pb-24 md:pt-48 md:pb-28">
        <motion.div initial="hidden" animate="show" variants={{}}>
          <motion.div variants={fade} custom={0} className="flex items-center gap-2 mb-7 text-sm text-gray-500 dark:text-gray-400">
            <span className="status-dot" />
            <span>Hyderabad, IN · remote-friendly · open to building</span>
          </motion.div>

          <motion.h1 variants={fade} custom={1} className="display text-[2.75rem] md:text-[4.25rem] mb-7">
            I build <span className="text-grad">AI products</span><br className="hidden md:block" />
            people actually use.
          </motion.h1>

          <motion.p variants={fade} custom={2} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4 max-w-xl">
            AI Solutions Architect making businesses AI-native — without pretending the hard parts are easy.
          </motion.p>
          <motion.p variants={fade} custom={3} className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-9 max-w-xl">
            Currently AI Research Architect at Antz AI. I ship production agentic AI, RAG, and decision
            systems — lately Budhi AI (1000+ downloads) and Planr AI.
          </motion.p>

          <motion.div variants={fade} custom={4} className="flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              See the work <FiArrowRight />
            </Link>
            <Link href="/cli" className="btn-outline font-mono">$ talk to my CLI</Link>
          </motion.div>

          <motion.div variants={fade} custom={5} className="flex mt-10 gap-5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
