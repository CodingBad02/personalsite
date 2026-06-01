import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import HeroImageReveal from '../components/HeroImageReveal';
import { FiArrowDown, FiArrowRight, FiChevronRight, FiGithub, FiLinkedin, FiMail, FiMusic } from 'react-icons/fi';

const services = [
  {
    title: 'Forward-Deployed AI Systems',
    category: 'Execution',
    description: 'I work close to users and operators, find the painful workflow, and turn it into a shipped AI system with measurable adoption.',
    highlights: ['Workflow discovery', 'Prototype to production', 'User-facing rollout', 'KPI instrumentation'],
  },
  {
    title: 'Enterprise AI Architecture',
    category: 'Systems',
    description: 'I design RAG, agent, and decision systems around evals, data boundaries, observability, and the parts that make leadership trust them.',
    highlights: ['RAG/agent architecture', 'Evals and guardrails', 'PII-aware flows', 'Observability'],
  },
  {
    title: 'AI Engineering Acceleration',
    category: 'Velocity',
    description: 'I help teams adopt the latest coding tools, repos, and AI engineering practices without chasing noisy trends or dead-end abstractions.',
    highlights: ['Agentic dev workflows', 'Repo/tool audits', 'Codegen guardrails', 'What not to build'],
  },
  {
    title: 'Computer Vision & Applied R&D',
    category: 'R&D',
    description: 'I turn messy images, video, and sensor data into decision loops: detection, tracking, action understanding, and field-tested feedback.',
    highlights: ['Detection and tracking', 'Action recognition', 'Data engine design', 'Edge/cloud deployment'],
  },
];

const matrixGlyphs = ['AI01', 'RAG', 'K8S', 'EVAL', 'SDK', 'CV', 'LLM', 'OBS', 'PII', 'CI'];

const products = [
  {
    title: 'Budhi AI',
    href: 'https://apps.apple.com/in/app/budhi-ai/id6755378258',
    tag: 'Second-memory app',
    image: '/images/budhi.png',
    description: 'A memory layer for notes, files, and moments you do not want to lose.',
    stat: '1000+ downloads',
    tilt: '-rotate-[3deg]',
  },
  {
    title: 'Planr AI',
    href: 'https://antz.ai/manufacturing/',
    tag: 'Decision intelligence',
    image: '/images/planr.png',
    description: 'Turns messy ERP/WMS data into shortage signals, ranked actions, and what-if planning.',
    stat: 'Manufacturing AI',
    tilt: 'rotate-[2deg]',
  },
  {
    title: 'V-Commerce Studio',
    href: '/blog/v-commerce-studio-gke-hackathon',
    tag: 'Agentic commerce',
    image: '/images/blog/Vcommerce-Logo.png',
    description: 'A hackathon build for agent-led shopping flows and product discovery.',
    stat: 'GKE hackathon',
    tilt: '-rotate-[1deg]',
  },
];

const stats = [
  { value: '17', suffix: '+', label: 'Fortune 500 clients', note: 'Enterprise AI systems shipped' },
  { value: '92', suffix: '%+', label: 'Retrieval quality', note: 'Across applied AI projects' },
  { value: '1000', suffix: '+', label: 'Budhi AI downloads', note: 'Second-memory users reached' },
  { value: '60', suffix: '%', label: 'Faster deployment time', note: 'Kubernetes release speed-up' },
];

const mono = "font-['JetBrains_Mono']";

const sections = [
  { num: '01', id: 'home', kicker: '// system.init', title: "Hi, I'm Manjunathan. I build AI products people actually use." },
  { num: '02', id: 'services', kicker: '// capabilities', title: 'Services' },
  { num: '03', id: 'work', kicker: '// shipped.products', title: 'Selected work' },
  { num: '04', id: 'metrics', kicker: '// operating.metrics', title: 'By the numbers' },
  { num: '05', id: 'contact', kicker: '// open.channel', title: 'Contact' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ProductCorners = () => (
  <>
    {[
      'top-0 left-0 border-t-2 border-l-2',
      'top-0 right-0 border-t-2 border-r-2',
      'bottom-0 left-0 border-b-2 border-l-2',
      'bottom-0 right-0 border-b-2 border-r-2',
    ].map((pos) => (
      <span key={pos} className={`product-corner ${pos}`} />
    ))}
  </>
);

const CountUpNumber = ({ value, suffix }) => {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const target = Number(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(target);
      return undefined;
    }

    let raf = 0;
    const duration = 1300;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(target * easeOut(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <span ref={ref}>
      {display.toLocaleString('en-US')}
      <span className="text-[#1b5def] dark:text-[#7cb5ff]">{suffix}</span>
    </span>
  );
};

const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

const scrambleTo = (value, progress) =>
  value
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' ';
      return index / value.length < progress
        ? char
        : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    })
    .join('');

const EncryptedName = () => {
  const realName = 'Manjunathan';
  const handle = 'CodingBad02';
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState(realName);

  useEffect(() => {
    const target = hovered ? handle : realName;
    let frame = 0;
    const totalFrames = 18;
    const id = window.setInterval(() => {
      frame += 1;
      setDisplay(scrambleTo(target, frame / totalFrames));
      if (frame >= totalFrames) {
        setDisplay(target);
        window.clearInterval(id);
      }
    }, 32);
    return () => window.clearInterval(id);
  }, [hovered]);

  return (
    <span
      className="encrypted-name inline-block text-[#1b5def] dark:text-[#7cb5ff]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={hovered ? 'CodingBad02' : 'Manjunathan'}
    >
      {display}
    </span>
  );
};

const IndexPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <Head>
        <title>Manjunathan Radhakrishnan | AI Solutions Architect</title>
        <meta name="description" content="Manjunathan Radhakrishnan is an AI Solutions Architect who builds useful AI products for real teams." />
      </Head>

      <div className="codedgar-home relative min-h-screen overflow-hidden bg-[#f4f4f4] text-[#191818] font-['Plus_Jakarta_Sans'] dark:bg-[#08090f] dark:text-[#f2f5ff]">
        <div className="home-noise" />
        <div className="home-top-fade pointer-events-none fixed inset-x-0 top-0 z-10 h-40" />

        <div className="relative mx-auto max-w-[1440px] px-6 pt-24 md:px-12 md:pt-28">
          <nav className="home-bottom-nav hidden lg:block fixed bottom-0 left-0 right-0 z-40 border-t px-5 py-3 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
              <div className={`${mono} flex items-center gap-3 text-[11px] text-[#191818]/45 dark:text-white/50`}>
                <span className="border border-[#191818]/10 bg-white/40 px-3 py-1 dark:border-white/10 dark:bg-white/5">[MODE: <span className="text-[#1b5def] dark:text-[#7cb5ff]">BUILDING</span>]</span>
                <span>// {activeSection}</span>
              </div>
              <ul className={`${mono} flex items-center gap-7 text-xs`}>
              {sections.map((s) => (
                <li key={s.num}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`transition-colors ${activeSection === s.id ? 'text-[#1b5def] dark:text-[#7cb5ff]' : 'text-[#191818]/35 hover:text-[#191818] dark:text-white/40 dark:hover:text-white'}`}
                  >
                    {s.num} / {s.id}
                  </button>
                </li>
              ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-0">
            <section
              id="home"
              ref={(el) => sectionRefs.current.home = el}
              className="relative mb-0 border-b border-[#1b5def]/35 pb-14 pt-10 dark:border-[#7cb5ff]/25 md:pb-16"
            >
              <div className="home-radial-fade" />
              <img
                src="/images/home-profile-2026.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-[35rem] z-0 h-36 w-28 object-cover opacity-[0.08] dark:hidden md:hidden"
              />
              <img
                src="/images/home-profile-dark.jpg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-[35rem] z-0 hidden h-36 w-28 object-cover opacity-[0.08] dark:block md:!hidden"
              />
              <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_440px] xl:grid-cols-[minmax(0,1fr)_520px]">
                <motion.div initial={false} animate="show" className="relative z-10 max-w-2xl">
                  <motion.span variants={fadeUp} custom={0} className={`${mono} mb-3 block text-xs text-[#191818]/35 dark:text-white/40`}>
                    {sections[0].kicker}
                  </motion.span>
                  <motion.div variants={fadeUp} custom={0.08} className={`${mono} mb-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#1b5def] dark:text-[#7cb5ff]`}>
                    <span>Hyderabad, IN</span>
                    <span>AI systems since 2019</span>
                    <span>building for real users</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    custom={0.16}
                    className="mb-8 max-w-[720px] font-heading text-[3rem] font-semibold leading-[1.04] tracking-normal text-[#191818] dark:text-[#f2f5ff] sm:text-[4rem] lg:text-[4.45rem]"
                  >
                    <span className="block">Hi, I'm</span>
                    <span className="block"><EncryptedName />.</span>
                    <span className="mt-2 block">I build AI products people actually use.</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} custom={0.24} className={`${mono} mb-6 text-base text-[#191818]/70 dark:text-white/70 md:text-lg`}>
                    AI Solutions Architect. Builder. Occasional overthinker.
                  </motion.p>
                  <motion.p variants={fadeUp} custom={0.32} className="max-w-xl text-base leading-8 text-[#191818]/68 dark:text-white/70 md:text-lg">
                    I like working on the part where an AI demo has to become a real product. The messy bits are usually the important ones:
                    retrieval, evaluation, latency, privacy, and the small decisions that make people trust what they are using.
                  </motion.p>

                  <motion.div variants={fadeUp} custom={0.36} className="mt-6 max-w-2xl">
                    <p className="text-sm leading-7 text-[#191818]/58 dark:text-white/60">
                      Off-screen, I am usually chasing a badminton slot on{' '}
                      <a href="https://open.turftown.in/player/6422fb760aed8ea06016cf11" target="_blank" rel="noopener noreferrer" className="hero-inline-link">
                        <img src="/images/turftown-logo.png" alt="" /> TurfTown
                      </a>
                      {' '}or{' '}
                      <a href="https://playo.co/profile/e25191f6-b242-4214-8c34-b591f94581f5" target="_blank" rel="noopener noreferrer" className="hero-inline-link">
                        <img src="/images/playo-logo.png" alt="" /> Playo
                      </a>
                      , lifting to a messy{' '}
                      <a href="https://open.spotify.com/playlist/5L4B4a7wcyBt7t7bmXK5A7?si=cCCRViGeSyym1RIs1nHmfA&pi=_yIR6iDiSRORQ" target="_blank" rel="noopener noreferrer" className="hero-inline-link">
                        <FiMusic /> gym playlist
                      </a>
                      , or being very normal about Ben 10 through the{' '}
                      <Link href="/cli" className="hero-inline-link">
                        <img src="/images/omnitrix.png" alt="" /> CLI
                      </Link>
                      . Online I answer to{' '}
                      <a href="https://github.com/CodingBad02" target="_blank" rel="noopener noreferrer" className="hero-inline-link">
                        <FiGithub /> CodingBad02
                      </a>
                      .
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp} custom={0.4} className="mt-9 flex flex-wrap gap-4">
                    <button onClick={() => scrollTo('services')} className={`${mono} inline-flex items-center gap-2 bg-[#1b5def] px-6 py-4 text-sm text-white transition-transform hover:-translate-y-0.5`}>
                      How I work <FiArrowRight />
                    </button>
                    <Link href="/projects" className={`${mono} inline-flex items-center gap-2 border border-[#191818]/30 bg-white/25 px-6 py-4 text-sm text-[#191818] transition-colors hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]`}>
                      Case studies
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 1, y: 28, rotate: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 mx-auto hidden w-full max-w-[520px] md:block"
                >
                  <div className="home-image-glow" />
                  <HeroImageReveal
                    src="/images/home-profile-2026.jpg"
                    alt="Manjunathan Radhakrishnan"
                    className="aspect-[4/5] w-full border border-[#191818]/10 shadow-[0_24px_80px_rgba(27,93,239,0.12)] dark:hidden lg:max-h-[640px]"
                  />
                  <HeroImageReveal
                    src="/images/home-profile-dark.jpg"
                    alt="Manjunathan Radhakrishnan"
                    className="hidden aspect-[4/5] w-full border dark:block dark:border-white/10 dark:shadow-[0_24px_90px_rgba(124,181,255,0.16)] lg:max-h-[640px]"
                  />
                </motion.div>
              </div>

              <div className={`${mono} pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs text-[#191818]/32 dark:text-white/40 md:flex`}>
                <span>0x01 // services</span>
                <FiArrowDown className="h-5 w-5 animate-bounce text-[#191818]/45 dark:text-white/50" />
              </div>
              <div className={`${mono} home-ascii pointer-events-none absolute left-[38%] top-20 hidden text-[56px] leading-[0.82] text-[#191818]/[0.035] dark:text-white/[0.045] lg:block`}>
                {['A', 'I', 'R', 'A', 'G', 'K', '8', 'S'].map((char, i) => <span key={i}>{char}</span>)}
              </div>
            </section>

            <section id="services" ref={(el) => sectionRefs.current.services = el} className="home-section relative border-b border-[#191818]/10 py-24 dark:border-white/10 md:py-32">
              <div className="home-edge-fade" />
              <span className="home-section-number">02</span>
              <div className="mb-12 max-w-2xl">
                <span className={`${mono} mb-4 block text-xs text-[#191818]/35 dark:text-white/40`}>{sections[1].kicker}</span>
                <h2 className="mb-5 font-heading text-4xl font-semibold leading-tight tracking-normal text-[#191818] dark:text-[#f2f5ff] md:text-6xl">{sections[1].title}</h2>
                <p className="text-lg leading-8 text-[#191818]/65 dark:text-white/70">
                  I usually come in when an AI idea has promise, but the path to production is still fuzzy.
                  My job is to make it concrete enough to ship.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                {services.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 1, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: i * 0.08, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                    className="home-card group relative min-h-[280px] border border-[#191818]/12 bg-white/35 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5def]/45 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#7cb5ff]/45"
                  >
                    <div className="service-matrix-field" aria-hidden="true">
                      {matrixGlyphs.map((glyph, glyphIndex) => (
                        <span key={`${s.title}-${glyph}`} style={{ '--i': glyphIndex }}>{glyph}</span>
                      ))}
                    </div>
                    <span className={`${mono} service-num right-5 top-4 text-[10px] text-[#ff4d2a]`}>[{String(i + 1).padStart(2, '0')}]</span>
                    <p className={`${mono} mb-4 text-xs uppercase text-[#1b5def] dark:text-[#7cb5ff]`}>{s.category}</p>
                    <h3 className="mb-3 font-heading text-2xl font-semibold leading-tight">{s.title}</h3>
                    <p className="mb-5 text-sm leading-7 text-[#191818]/66 dark:text-white/70">{s.description}</p>
                    <ul className="space-y-2">
                      {s.highlights.map((h) => (
                        <li key={h} className={`${mono} flex gap-2 text-[10px] text-[#191818]/50 dark:text-white/50`}>
                          <span className="text-[#1b5def] dark:text-[#7cb5ff]">+</span><span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="work" ref={(el) => sectionRefs.current.work = el} className="home-section home-dot-field relative border-b border-[#191818]/10 py-24 dark:border-white/10 md:py-32">
              <span className="home-section-number">03</span>
              <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className={`${mono} mb-4 block text-xs text-[#191818]/35 dark:text-white/40`}>{sections[2].kicker}</span>
                  <h2 className="mb-4 font-heading text-4xl font-semibold leading-tight tracking-normal text-[#191818] dark:text-[#f2f5ff] md:text-6xl">Products I have built</h2>
                  <p className="max-w-xl text-lg leading-8 text-[#191818]/60 dark:text-white/60">
                    The part I care about most: turning a useful idea into something with a name, a logo, and people on the other side of it.
                  </p>
                </div>
                <Link href="/projects" className={`${mono} inline-flex w-fit items-center gap-2 border border-[#191818]/20 bg-[#f4f4f4]/75 px-5 py-3 text-sm text-[#191818] hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]`}>
                  All work <FiArrowRight />
                </Link>
              </div>
              <div className="product-showcase grid gap-6 md:grid-cols-3">
                {products.map((p, i) => (
                  <motion.a
                    key={p.title}
                    href={p.href}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 1, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`product-tile group relative flex min-h-[350px] flex-col justify-between border border-[#191818]/12 bg-white/45 p-5 text-[#191818] shadow-[0_24px_80px_rgba(25,24,24,0.08)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:border-[#1b5def]/55 dark:border-white/10 dark:bg-[#101010] dark:text-white dark:hover:border-[#7cb5ff]/55 ${p.tilt}`}
                  >
                    <ProductCorners />
                    <div className="product-shine" />
                    <div className={`${mono} flex items-center justify-between border-b border-[#191818]/10 pb-4 text-xs text-[#191818]/50 dark:border-white/10 dark:text-white/55`}>
                      <span>{p.tag}</span>
                      <span>[0{ i + 1 }]</span>
                    </div>
                    <div className="product-logo-stage">
                      <img src={p.image} alt={`${p.title} logo`} className={`product-logo ${p.title === 'Planr AI' ? 'product-logo--wide' : ''} ${p.title === 'V-Commerce Studio' ? 'product-logo--media' : ''}`} />
                    </div>
                    <div>
                      <div className="mb-4 flex items-end justify-between gap-4">
                        <h3 className="font-heading text-3xl font-semibold leading-tight">{p.title}</h3>
                        <FiChevronRight className="mb-1 shrink-0 text-[#1b5def] transition-transform group-hover:translate-x-1 dark:text-[#7cb5ff]" />
                      </div>
                      <p className="mb-4 text-sm leading-6 text-[#191818]/62 dark:text-white/60">{p.description}</p>
                      <span className={`${mono} inline-flex border border-[#191818]/10 bg-[#191818]/5 px-3 py-1 text-[11px] text-[#191818]/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60`}>
                        {p.stat}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </section>

            <section id="metrics" ref={(el) => sectionRefs.current.metrics = el} className="home-section relative border-b border-[#191818]/10 py-24 dark:border-white/10 md:py-32">
              <div className="metrics-panel relative overflow-hidden border border-[#191818]/12 px-6 py-12 dark:border-white/10 md:px-14 md:py-16">
                <span className="metrics-panel-number">04</span>
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)]">
                  <div className="relative z-10 max-w-2xl">
                    <span className={`${mono} mb-4 block text-xs text-[#191818]/45 dark:text-white/40`}>{sections[3].kicker}</span>
                    <h2 className="mb-6 font-heading text-4xl font-semibold leading-tight tracking-normal text-[#191818] dark:text-[#f2f5ff] md:text-6xl">{sections[3].title}</h2>
                    <p className="mb-8 text-lg leading-8 text-[#191818]/66 dark:text-white/70">
                      A few operating numbers from the work: users reached, retrieval quality, enterprise constraints, and deployment speed.
                    </p>
                    <Link href="/projects" className={`${mono} inline-flex items-center gap-2 border border-[#191818]/25 px-5 py-3 text-sm text-[#191818] transition-colors hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/20 dark:text-white dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]`}>
                      See the work <FiArrowRight />
                    </Link>
                  </div>

                  <div className="metrics-grid relative z-10 grid grid-cols-1 border border-[#191818]/12 bg-white/20 dark:border-white/10 dark:bg-white/[0.025] sm:grid-cols-2">
                    {stats.map((s) => (
                      <div key={s.label} className="metrics-stat px-8 py-9 text-center">
                        <span className="block font-heading text-5xl font-semibold leading-none text-[#191818] dark:text-[#f2f5ff] md:text-6xl">
                          <CountUpNumber value={s.value} suffix={s.suffix} />
                        </span>
                        <p className={`${mono} mt-5 text-sm text-[#191818]/68 dark:text-white/70`}>{s.label}</p>
                        <p className={`${mono} mt-2 text-xs text-[#191818]/42 dark:text-white/40`}>{s.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" ref={(el) => sectionRefs.current.contact = el} className="home-section relative py-24 text-center md:py-32">
              <span className="home-section-number">05</span>
              <span className={`${mono} mb-4 block text-xs text-[#191818]/35 dark:text-white/40`}>{sections[4].kicker}</span>
              <h2 className="mb-5 font-heading text-4xl font-semibold leading-tight tracking-normal text-[#191818] dark:text-[#f2f5ff] md:text-6xl">{sections[4].title}</h2>
              <p className="mx-auto mb-9 max-w-xl text-lg leading-8 text-[#191818]/68 dark:text-white/70">
                If you are building something useful with AI and want a second brain on the hard parts, write to me.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:manjunathan.ai02@gmail.com" className={`${mono} inline-flex items-center gap-2 bg-[#191818] px-6 py-4 text-sm text-[#f4f4f4] transition-colors hover:bg-[#1b5def]`}>
                  <FiMail /> Get in touch
                </a>
                <a href="https://linkedin.com/in/manjunathan-r-06396b1b7/" target="_blank" rel="noopener noreferrer" className={`${mono} inline-flex items-center gap-2 border border-[#191818]/20 px-6 py-4 text-sm transition-colors hover:border-[#1b5def]/50 hover:text-[#1b5def] dark:border-white/20 dark:hover:border-[#7cb5ff]/60 dark:hover:text-[#7cb5ff]`}>
                  <FiLinkedin /> LinkedIn
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IndexPage;
