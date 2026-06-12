import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { FiArrowUpRight } from 'react-icons/fi';
import BuyMeAChai from './BuyMeAChai';
import Magnetic from './motion/Magnetic';
import Reveal from './motion/Reveal';

const explore = [
  { name: 'Work', href: '/projects' },
  { name: 'Writing', href: '/blog' },
  { name: 'CLI', href: '/cli' },
];
const contact = [
  { name: 'Email', href: 'mailto:manjunathan.ai02@gmail.com' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/manjunathan-r-06396b1b7/' },
  { name: 'GitHub', href: 'https://github.com/CodingBad02' },
  { name: 'Instagram', href: 'https://www.instagram.com/koffeewith.ai?igsh=MXF4bTk2MnB5Mzd3cA==' },
];
const locations = ['Hyderabad', 'Chennai', 'Mumbai', 'Remote'];
const tickerWords = ['AI products', 'RAG', 'agents', 'computer vision', 'evals', 'shipped, not demoed'];

const LocationsCol = () => (
  <div>
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#191818]/40 dark:text-white/35 mb-4">LOCATIONS/</p>
    <ul className="space-y-2.5">
      {locations.map((loc) => (
        <li key={loc} className="text-sm text-[#191818]/70 dark:text-white/70">{loc}</li>
      ))}
    </ul>
  </div>
);

const Col = ({ label, items }) => (
  <div>
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#191818]/40 dark:text-white/35 mb-4">{label}/</p>
    <ul className="space-y-2.5">
      {items.map((l) => {
        const ext = l.href.startsWith('http') || l.href.startsWith('mailto');
        return (
          <li key={l.name}>
            {ext ? (
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-[#191818]/70 hover:text-[#191818] dark:text-white/70 dark:hover:text-white transition-all duration-300 hover:translate-x-0.5">
                {l.name}
                <FiArrowUpRight className="h-3.5 w-3.5 text-[#191818]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1b5def] dark:text-white/30 dark:group-hover:text-[#7cb5ff]" />
              </a>
            ) : (
              <Link href={l.href} className="inline-block text-sm text-[#191818]/70 hover:text-[#191818] dark:text-white/70 dark:hover:text-white transition-all duration-300 hover:translate-x-0.5">{l.name}</Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const Footer = () => {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () =>
      setNow(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#191818]/10 bg-[#f3f2f5] text-[#191818] transition-colors dark:border-white/10 dark:bg-[#05070d] dark:text-white">
      {/* soft glow */}
      <div className="glow-radial pointer-events-none absolute inset-0 opacity-40 dark:opacity-70" />

      {/* drifting ticker */}
      <div className="relative border-b border-[#191818]/8 py-6 dark:border-white/8" aria-hidden="true">
        <Marquee speed={42} pauseOnHover gradient={false} autoFill>
          <span className="footer-marquee whitespace-nowrap text-4xl md:text-5xl">
            {tickerWords.map((w) => (
              <span key={w}>
                {w}
                <span className="tick mx-5">✱</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>

      <div className="relative container-narrow py-16 md:py-20">
        {/* status row */}
        <Reveal className="flex items-center gap-2 mb-8 text-xs font-mono text-[#191818]/55 dark:text-white/45">
          <span className="text-[#1b5def] dark:text-[#7cb5ff]">✱</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#1b5def] dark:bg-[#7cb5ff] animate-blink" />
          available for building · Hyderabad, IN · <span className="text-[#191818]/80 dark:text-white/70">{now || '··:··'} IST</span>
        </Reveal>

        {/* big CTA */}
        <Reveal as="h2" delay={0.06} className="display text-4xl md:text-6xl mb-10 leading-[1.08] pb-2">
          Let's build<br />something <span className="italic text-grad inline-block pr-2 pb-[0.12em] leading-[1.25]">good</span>.
        </Reveal>

        <Reveal delay={0.12} className="flex flex-wrap items-center gap-3 mb-14">
          <Magnetic>
            <a href="mailto:manjunathan.ai02@gmail.com" className="btn-wipe group inline-flex items-center gap-2 rounded-lg bg-[#191818] px-5 py-2.5 text-sm font-medium text-white transition-colors dark:bg-white dark:text-[#08090f] dark:hover:text-white">
              Say hi <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="/cli" className="inline-flex items-center gap-2 rounded-lg border border-[#191818]/20 px-5 py-2.5 text-sm font-mono text-[#191818]/80 hover:border-[#1b5def] hover:text-[#191818] dark:border-white/15 dark:text-white/80 dark:hover:border-[#7cb5ff] dark:hover:text-white transition-colors">
              $ ask sun anything
            </Link>
          </Magnetic>
        </Reveal>

        {/* columns */}
        <Reveal delay={0.16} className="grid grid-cols-2 gap-8 mb-12 max-w-xl sm:grid-cols-3">
          <Col label="EXPLORE" items={explore} />
          <Col label="CONTACT" items={contact} />
          <LocationsCol />
        </Reveal>

        {/* chai */}
        <div className="mb-12"><BuyMeAChai /></div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-[#191818]/10 dark:border-white/10">
          <span className="font-mono text-sm">manjunathan<span className="text-[#1b5def] dark:text-[#7cb5ff]">.dev</span></span>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#191818]/40 dark:text-white/35">
            <Link href="/privacy" className="hover:text-[#191818]/70 dark:hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#191818]/70 dark:hover:text-white/70 transition-colors">Terms</Link>
            <span>© {year} · grounded by Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
