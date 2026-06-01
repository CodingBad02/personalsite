import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

/**
 * codedgar.com/portfolio styled card.
 * Tokens: cream #f4f4f4 / ink #191818 / blue #1b5def, sharp corners, thin borders,
 * Instrument Serif titles, JetBrains Mono labels.
 * On hover/focus: blue corner brackets snap in, the project image zooms subtly,
 * and the whole card gives a gentle 3D pop (lift + scale).
 */
const serif = "font-['Instrument_Serif']";
const mono = "font-['JetBrains_Mono']";

// Blue L-shaped focus brackets that fade + scale in on hover (his "focus frame")
const Corners = () => (
  <>
    {[
      'top-0 left-0 border-t-2 border-l-2',
      'top-0 right-0 border-t-2 border-r-2',
      'bottom-0 left-0 border-b-2 border-l-2',
      'bottom-0 right-0 border-b-2 border-r-2',
    ].map((pos) => (
      <span
        key={pos}
        className={`pointer-events-none absolute h-5 w-5 border-[#1b5def] opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 dark:border-[#7cb5ff] ${pos}`}
        style={{ margin: '-7px' }}
      />
    ))}
  </>
);

const ProjectCard = ({ project, index = 0, featured = false }) => {
  const { title, description, longDescription, technologies = [], githubLink, demoLink, category, year, highlights = [], image } = project;
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const Meta = () => (
    <p className="text-[#1b5def] dark:text-[#7cb5ff] text-base flex gap-3">
      {year && <span>{year}</span>}
      {category && <span>{category}</span>}
    </p>
  );

  const Highlights = () => highlights.length > 0 && (
    <ul className="space-y-1.5">
      {highlights.map((h) => (
        <li key={h} className={`${mono} text-xs text-[#191818]/70 dark:text-white/70 flex gap-2`}>
          <span className="text-[#1b5def] dark:text-[#7cb5ff]">+</span><span>{h}</span>
        </li>
      ))}
    </ul>
  );

  const Chips = () => (
    <div className="flex flex-wrap gap-1.5">
      {technologies.map((t) => (
        <span key={t} className={`${mono} text-[10px] text-[#191818]/70 bg-[#191818]/5 border border-[#191818]/10 px-2 py-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white/70`}>{t}</span>
      ))}
    </div>
  );

  const Image = () => (
    <div className="relative overflow-hidden bg-[#f0ece4] border border-[#191818]/10 aspect-[16/10] dark:border-white/10 dark:bg-white/5">
      {image ? (
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover:scale-[1.06]" />
      ) : (
        <span className={`${serif} absolute inset-0 flex items-center justify-center text-[100px] text-[#191818]/15 dark:text-white/10`}>{String(index + 1).padStart(2, '0')}</span>
      )}
    </div>
  );

  const Toggle = () => (longDescription || githubLink || demoLink) && (
    <button onClick={() => setOpen((v) => !v)} className={`${mono} text-xs text-[#1b5def] dark:text-[#7cb5ff] inline-flex items-center gap-1.5 hover:gap-2.5 transition-all`}>
      {open ? 'Hide details' : 'View details'} <span>{open ? '↑' : '→'}</span>
    </button>
  );

  const Details = () => (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <div className="mt-4 pt-4 border-t border-[#191818]/10 dark:border-white/10">
            {longDescription && (
              <div className="prose prose-sm max-w-none text-[#191818]/80 prose-headings:text-[#191818] prose-strong:text-[#191818] prose-a:text-[#1b5def] dark:prose-invert dark:text-white/80 dark:prose-a:text-[#7cb5ff]">
                <ReactMarkdown>{longDescription}</ReactMarkdown>
              </div>
            )}
            {(githubLink || demoLink) && (
              <div className={`${mono} text-xs flex gap-4 mt-4`}>
                {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#1b5def] dark:text-[#7cb5ff]"><FiGithub /> View code</a>}
                {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#1b5def] dark:text-[#7cb5ff]"><FiExternalLink /> Live demo</a>}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const motionProps = {
    ref,
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay: index * 0.06 },
    style: { transformPerspective: 1200 },
  };

  if (featured) {
    return (
      <div className="[perspective:1200px]">
        <motion.div
          {...motionProps}
          whileHover={{ y: -6, rotateX: 1.6, boxShadow: '0 18px 40px rgba(27,93,239,0.12)' }}
          className="group relative grid md:grid-cols-2 gap-8 p-8 border border-[#1b5def]/20 bg-white/30 dark:border-[#7cb5ff]/20 dark:bg-white/[0.035]"
        >
          <Corners />
          <div className="hidden md:block"><Image /></div>
          <div className="flex flex-col gap-4">
            <Meta />
            <div className="space-y-2">
              <h3 className={`${serif} text-[28px] leading-tight text-[#191818] dark:text-[#f2f5ff]`}>{title}</h3>
              <p className="text-[#191818]/70 dark:text-white/70 text-sm leading-relaxed">{description}</p>
            </div>
            <Highlights />
            <Chips />
            <Toggle />
            <Details />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="[perspective:1200px] h-full">
      <motion.div
        {...motionProps}
        whileHover={{ y: -5, rotateX: 1.4, boxShadow: '0 14px 32px rgba(25,24,24,0.10)' }}
        className="group relative flex flex-col gap-4 p-7 border border-[#191818]/10 bg-white/30 h-full dark:border-white/10 dark:bg-white/[0.035]"
      >
        <Corners />
        <Image />
        <Meta />
        <div className="space-y-2">
          <h3 className={`${serif} text-2xl leading-tight text-[#191818] dark:text-[#f2f5ff]`}>{title}</h3>
          <p className="text-[#191818]/70 dark:text-white/70 text-sm leading-relaxed">{description}</p>
        </div>
        <Highlights />
        <div className="mt-auto space-y-4">
          <Chips />
          <Toggle />
          <Details />
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
