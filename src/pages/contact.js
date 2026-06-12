import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import ContactForm from '../components/ContactForm';
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from '../components/TextRevealCard';
import { EncryptedText } from '../components/EncryptedText';
import Reveal from '../components/motion/Reveal';
import { FiArrowRight, FiCalendar, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const mono = "font-['JetBrains_Mono']";

const channels = [
  {
    label: 'Email',
    value: 'manjunathan.ai02@gmail.com',
    href: 'mailto:manjunathan.ai02@gmail.com',
    icon: FiMail,
  },
  {
    label: 'Calendar',
    value: '30 minute working session',
    href: 'https://calendly.com/manjunathan-ai02/30min',
    icon: FiCalendar,
  },
  {
    label: 'LinkedIn',
    value: 'Manjunathan R',
    href: 'https://linkedin.com/in/manjunathan-r-06396b1b7/',
    icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    value: 'CodingBad02',
    href: 'https://github.com/CodingBad02',
    icon: FiGithub,
  },
];

const steps = [
  {
    title: 'Send context',
    text: 'Tell me what you are trying to build, where the AI system is stuck, and what a useful win would look like.',
  },
  {
    title: 'I map the problem',
    text: 'I look for the workflow, data boundary, evaluation loop, and the first thing worth shipping instead of a deck.',
  },
  {
    title: 'We decide the build path',
    text: 'If there is fit, we define a lean plan: prototype, production path, risks, and what not to spend time on.',
  },
];

const Contact = () => (
  <MainLayout>
    <Head>
      <title>Contact | Manjunathan Radhakrishnan</title>
      <meta name="description" content="Contact Manjunathan Radhakrishnan for forward-deployed AI systems, RAG, agents, computer vision, and AI engineering work." />
    </Head>

    <div className="contact-page relative overflow-hidden bg-[#f4f4f4] text-[#191818] dark:bg-[#08090f] dark:text-[#f2f5ff]">
      <div className="dot-pattern" aria-hidden="true" />
      <div className="interactive-grid-pattern" aria-hidden="true" />

      <main className="relative mx-auto max-w-[1240px] px-6 pb-24 pt-32 md:px-12 md:pb-32">
        <section className="grid gap-12 border-b border-[#191818]/10 pb-16 dark:border-white/10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className={`${mono} mb-5 block text-xs text-[#191818]/40 dark:text-white/40`}>// page.contact</span>
            <h1 className="mb-7 font-heading text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
              <EncryptedText text="Bring the messy AI problem." />
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#191818]/68 dark:text-white/70">
              I am useful when a team needs someone customer-facing who can move between product context,
              ML systems, coding tools, and research judgement without losing the plot.
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#191818]/10 py-16 dark:border-white/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className={`${mono} mb-4 block text-xs text-[#191818]/40 dark:text-white/40`}>// direct.channels</span>
            <h2 className="mb-5 font-heading text-4xl font-semibold tracking-normal md:text-5xl">
              <EncryptedText text="Reach me where it is easiest." />
            </h2>
            <p className="max-w-xl text-base leading-8 text-[#191818]/64 dark:text-white/64">
              Email is best for context. Calendar is best when the problem is already shaped enough for a working session.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              const external = channel.href.startsWith('http');
              return (
                <Reveal key={channel.label} delay={index * 0.07} className="h-full">
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="contact-channel group relative block h-full overflow-hidden border border-[#191818]/12 bg-white/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5def]/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#7cb5ff]/50"
                  >
                    <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[#191818]/12 text-[#1b5def] transition-all duration-300 group-hover:border-[#1b5def]/50 group-hover:bg-[#1b5def] group-hover:text-white dark:border-white/10 dark:text-[#7cb5ff] dark:group-hover:bg-[#7cb5ff] dark:group-hover:text-[#08090f]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={`${mono} block text-xs text-[#191818]/45 dark:text-white/45`}>{channel.label}</span>
                    <span className="mt-2 flex items-center justify-between gap-4 text-lg font-medium">
                      {channel.value}
                      <FiArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 border-b border-[#191818]/10 py-16 dark:border-white/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className={`${mono} mb-4 block text-xs text-[#191818]/40 dark:text-white/40`}>// what.happens.next</span>
            <h2 className="mb-5 font-heading text-4xl font-semibold tracking-normal md:text-5xl">
              <EncryptedText text="A simple path." />
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="contact-step grid gap-4 border border-[#191818]/12 bg-white/20 p-5 transition-colors duration-300 hover:border-[#1b5def]/40 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-[#7cb5ff]/40 md:grid-cols-[72px_1fr]">
                  <span className={`${mono} text-sm text-[#1b5def] dark:text-[#7cb5ff]`}>0{index + 1}</span>
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="leading-7 text-[#191818]/64 dark:text-white/64">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-6 border-b border-[#191818]/10 py-16 text-center dark:border-white/10">
          <span className={`${mono} block text-xs text-[#191818]/40 dark:text-white/40`}>// the.deal</span>
          <TextRevealCard
            text="You know the Business"
            revealText="I know the chemistry"
          >
            <TextRevealCardTitle>Hover to find the fit.</TextRevealCardTitle>
            <TextRevealCardDescription>
              You bring the domain and the customers. I bring the AI systems that ship.
            </TextRevealCardDescription>
          </TextRevealCard>
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className={`${mono} mb-4 block text-xs text-[#191818]/40 dark:text-white/40`}>// send.note</span>
            <h2 className="mb-5 font-heading text-4xl font-semibold tracking-normal md:text-5xl">
              <EncryptedText text="Write the first useful packet." />
            </h2>
            <p className="mb-6 max-w-xl leading-8 text-[#191818]/64 dark:text-white/64">
              A good note has the business problem, the current system, the users affected, and the constraint that makes it hard.
            </p>
            <Link href="/projects" className={`${mono} inline-flex items-center gap-2 border border-[#191818]/25 px-5 py-3 text-sm transition-colors hover:border-[#1b5def] hover:text-[#1b5def] dark:border-white/20 dark:hover:border-[#7cb5ff] dark:hover:text-[#7cb5ff]`}>
              See previous work <FiArrowRight />
            </Link>
          </div>

          <div className="contact-form-shell">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  </MainLayout>
);

export default Contact;
