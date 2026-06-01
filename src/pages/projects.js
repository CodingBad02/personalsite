// src/pages/projects.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ProjectCard from '../components/ProjectCard';
import { EncryptedText } from '../components/EncryptedText';
import projectsData from '../data/projects';

const featured = projectsData.filter((p) => p.featured);
const more = projectsData.filter((p) => !p.featured);

const serif = "font-['Instrument_Serif']";
const mono = "font-['JetBrains_Mono']";

const SectionHead = ({ num, kicker, title, children }) => (
  <div className="flex gap-6 md:gap-10 mb-10">
    <span className={`${serif} text-2xl text-[#1b5def] dark:text-[#7cb5ff] pt-1`}>{num}</span>
    <div className="max-w-2xl">
      <span className={`${mono} text-xs text-[#191818]/40 dark:text-white/40 tracking-wide block mb-3`}>{kicker}</span>
      <h2 className={`${serif} text-4xl md:text-[52px] leading-none text-[#191818] dark:text-[#f2f5ff] mb-3`}>
        <EncryptedText text={title} />
      </h2>
      {children && <p className="text-[#191818]/70 dark:text-white/70 leading-relaxed">{children}</p>}
    </div>
  </div>
);

const Projects = () => (
  <MainLayout>
    <Head>
      <title>Work | Manjunathan Radhakrishnan</title>
    </Head>

    {/* codedgar.com/portfolio visual identity, scoped to this page */}
    <div className="bg-[#f4f4f4] text-[#191818] font-['Plus_Jakarta_Sans'] dark:bg-[#08090f] dark:text-[#f2f5ff]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12 py-20 space-y-24">
        {/* 01 — intro */}
        <section>
          <SectionHead num="01" kicker="// page.work" title="Work">
            Research and engineering projects where the interesting part was always the
            problem behind the decisions — and the tradeoffs that came with them.
          </SectionHead>
        </section>

        {/* 02 — featured */}
        {featured.length > 0 && (
          <section>
            <SectionHead num="02" kicker="// section.featured" title="Featured Projects">
              The ones with the most interesting problems and the biggest impact.
            </SectionHead>
            <div className="space-y-6">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} featured />
              ))}
            </div>
          </section>
        )}

        {/* 03 — more */}
        {more.length > 0 && (
          <section>
            <SectionHead num="03" kicker="// section.more" title="More Projects">
              More work, from computer vision to embedded systems and simulation.
            </SectionHead>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {more.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </MainLayout>
);

export default Projects;
