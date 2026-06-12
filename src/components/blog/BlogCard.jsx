import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import { readingTime } from '../../utils/readingTime';
import { EASE, VIEWPORT } from '../../utils/motion';

const mono = "font-['JetBrains_Mono']";

// Blue L-shaped focus brackets — same frame as ProjectCard / product tiles
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
        className={`pointer-events-none absolute z-10 h-5 w-5 border-[#1b5def] opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 dark:border-[#7cb5ff] ${pos}`}
        style={{ margin: '-7px' }}
      />
    ))}
  </>
);

const BlogCard = ({ post, index = 0 }) => {
  const { minutes } = readingTime(post.content || post.summary || '');
  const thumb =
    post.mediaType === 'image'
      ? post.mediaUrl
      : post.mediaType === 'youtube'
      ? `https://img.youtube.com/vi/${post.mediaUrl}/hqdefault.jpg`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex h-full flex-col overflow-visible border border-[#191818]/12 bg-white/30 transition-colors duration-300 hover:border-[#1b5def]/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#7cb5ff]/50"
      >
        <Corners />
        <figure className="img-frame relative aspect-video border-0 border-b border-[#191818]/10 dark:border-white/10">
          {thumb ? (
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#1b5def]/15 to-[#7cb5ff]/10" />
          )}
          <span className={`${mono} absolute right-3 top-3 bg-[#08090f]/70 px-2 py-1 text-[10px] uppercase tracking-wide text-white backdrop-blur-sm`}>
            {post.type || 'article'}
          </span>
        </figure>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-[#1b5def] dark:group-hover:text-[#7cb5ff]">
              {post.title}
            </h3>
            <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#191818]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1b5def] dark:text-white/30 dark:group-hover:text-[#7cb5ff]" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#191818]/64 dark:text-white/64">
            {post.summary}
          </p>
          <div className={`${mono} mt-auto flex items-center gap-1.5 pt-4 text-xs text-[#191818]/45 dark:text-white/45`}>
            <FiClock className="h-3 w-3" />
            {post.date} · {minutes} min read
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
