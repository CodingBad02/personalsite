// src/pages/about.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ResumePDF from '../components/ResumePDF';
import Reveal from '../components/motion/Reveal';
import { EncryptedText } from '../components/EncryptedText';
import { FiAward, FiHeart, FiMusic } from 'react-icons/fi';

const serif = "font-['Instrument_Serif']";
const mono = "font-['JetBrains_Mono']";

const SectionHead = ({ num, kicker, title, children }) => (
  <div className="mb-10 flex gap-6 md:gap-10">
    <span className={`${serif} pt-1 text-2xl text-[#1b5def] dark:text-[#7cb5ff]`}>{num}</span>
    <div className="max-w-2xl">
      <span className={`${mono} mb-3 block text-xs tracking-wide text-[#191818]/40 dark:text-white/40`}>{kicker}</span>
      <h2 className={`${serif} mb-3 text-4xl leading-none text-[#191818] dark:text-[#f2f5ff] md:text-[52px]`}>
        <EncryptedText text={title} />
      </h2>
      {children && <p className="leading-relaxed text-[#191818]/70 dark:text-white/70">{children}</p>}
    </div>
  </div>
);

const awards = [
  'Winner at MADHACK 23 and MADHACK 24 — ML solutions for a graph marketplace and an auction-based inventory system.',
  'Winner, Smart India Hackathon 2022 — IoT-based gait analysis system for medical applications (PS RK766).',
  'Winner, IEEE Catalyst award — research on Graph Convolutional Networks, applied to predicting pandemic incidence.',
  'SSN Research Grant — CGM Pump (more in the Work section).',
];

const interests = [
  {
    title: 'Badminton',
    text: 'At least twice a week, every week. Quick reflexes, agility, and strategy — the same instincts I bring to shipping.',
    link: { href: 'https://open.turftown.in/player/6422fb760aed8ea06016cf11', label: 'Play with me on TurfTown', img: '/images/turftown-logo.png' },
  },
  {
    title: 'Fitness',
    text: 'Split training, daily. The discipline and consistency carry straight into the work.',
    link: { href: 'https://open.spotify.com/playlist/5L4B4a7wcyBt7t7bmXK5A7?si=cCCRViGeSyym1RIs1nHmfA&pi=_yIR6iDiSRORQ', label: 'My gym playlist', icon: FiMusic },
  },
  {
    title: 'Music',
    text: 'Classic rock to hip-hop and R&B. Focus fuel for long coding sessions, recovery fuel after them.',
  },
];

const About = () => {
  return (
    <MainLayout>
      <Head>
        <title>About | Manjunathan Radhakrishnan</title>
      </Head>

      <div className="bg-[#f4f4f4] text-[#191818] font-['Plus_Jakarta_Sans'] dark:bg-[#08090f] dark:text-[#f2f5ff]">
        <div className="mx-auto max-w-[1100px] space-y-20 px-6 py-20 md:px-12">
          {/* 01 — whoami */}
          <section>
            <SectionHead num="01" kicker="// page.whoami" title="About">
              I build AI products people use — and I like shipping more than slide decks.
            </SectionHead>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="space-y-5 text-base leading-8 text-[#191818]/75 dark:text-white/75 md:col-span-2 md:text-lg">
                <Reveal as="p">
                  I'm Manjunathan Radhakrishnan — an <strong className="text-[#191818] dark:text-white">AI Solutions Architect</strong> building
                  production agentic AI, RAG, and decision systems. I care about the boring parts that make
                  them real: groundedness, observability, PII masking, SOC2.
                </Reveal>
                <Reveal as="p" delay={0.06}>
                  Today I'm <strong className="text-[#191818] dark:text-white">AI Research Architect at Antz AI</strong>, where I shipped{' '}
                  <strong className="text-[#191818] dark:text-white">Budhi AI</strong> (a second-memory app, 1000+ downloads, 92%+ retrieval
                  precision) and <strong className="text-[#191818] dark:text-white">Planr AI</strong> (a manufacturing decision-intelligence
                  platform). Before that, at Mad Street Den (Vue.ai), I architected multimodal AI for 17+ Fortune 500
                  clients and built TrainConv, cutting model deployment time by 60%.
                </Reveal>
                <Reveal as="p" delay={0.12}>
                  The path here: B.E. at SSN → computer-vision research at IIT Madras' Robert Bosch Centre →
                  action recognition at Drishti → enterprise ML at Mad Street Den → product + research at Antz AI.
                  Customer-facing throughout, IEEE-published, and still in love with the build.
                </Reveal>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Reveal delay={0.1}>
                  <div className="group border border-[#191818]/12 bg-white/30 p-6 text-center dark:border-white/10 dark:bg-white/[0.035]">
                    <figure className="img-frame mx-auto mb-5 aspect-square w-40">
                      <img src="/images/profile.jpg" alt="Manjunathan Radhakrishnan" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </figure>
                    <h2 className="mb-1 text-xl font-semibold">Manjunathan R</h2>
                    <p className={`${mono} mb-4 text-xs text-[#191818]/50 dark:text-white/50`}>Hyderabad, India</p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {['AI Solutions Architect', 'Product Builder'].map((chip) => (
                        <span key={chip} className={`${mono} border border-[#191818]/10 bg-[#191818]/5 px-2.5 py-1 text-[10px] text-[#191818]/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70`}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.16}>
                  <ResumePDF />
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="border border-[#191818]/12 bg-white/30 p-6 dark:border-white/10 dark:bg-white/[0.035]">
                    <p className={`${mono} mb-4 text-xs text-[#191818]/45 dark:text-white/45`}>// now.playing 🎧</p>
                    <img
                      src="https://codingbad02.pythonanywhere.com/now-playing"
                      alt="Spotify Now Playing"
                      loading="lazy"
                      decoding="async"
                      className="w-full"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 02 — off screen */}
          <section>
            <SectionHead num="02" kicker="// off.screen" title="Off-screen">
              <span className="inline-flex items-center gap-2"><FiHeart className="h-4 w-4 text-[#1b5def] dark:text-[#7cb5ff]" /> The non-negotiables outside the terminal.</span>
            </SectionHead>
            <div className="grid gap-5 md:grid-cols-3">
              {interests.map((item, index) => {
                const Icon = item.link?.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.08} className="h-full">
                    <div className="flex h-full flex-col border border-[#191818]/12 bg-white/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5def]/45 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#7cb5ff]/45">
                      <span className={`${mono} mb-3 text-[10px] text-[#ff4d2a]`}>[0{index + 1}]</span>
                      <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                      <p className="mb-4 text-sm leading-7 text-[#191818]/64 dark:text-white/64">{item.text}</p>
                      {item.link && (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${mono} group mt-auto inline-flex w-fit items-center gap-2 border border-[#191818]/20 px-3 py-2 text-xs transition-colors hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/15 dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]`}
                        >
                          {item.link.img && <img src={item.link.img} alt="" className="h-4 w-4" />}
                          {Icon && <Icon className="h-4 w-4" />}
                          {item.link.label}
                        </a>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* 03 — awards */}
          <section>
            <SectionHead num="03" kicker="// awards.recognition" title="Awards">
              <span className="inline-flex items-center gap-2"><FiAward className="h-4 w-4 text-[#1b5def] dark:text-[#7cb5ff]" /> Hackathons, research, and grants along the way.</span>
            </SectionHead>
            <ul className="space-y-3">
              {awards.map((award, index) => (
                <Reveal as="li" key={award} delay={index * 0.06}>
                  <div className="flex gap-4 border border-[#191818]/12 bg-white/20 p-5 transition-colors duration-300 hover:border-[#1b5def]/40 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#7cb5ff]/40">
                    <span className={`${mono} shrink-0 text-sm text-[#1b5def] dark:text-[#7cb5ff]`}>0{index + 1}</span>
                    <p className="text-sm leading-7 text-[#191818]/75 dark:text-white/75">{award}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
