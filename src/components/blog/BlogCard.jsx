import React from 'react';
import Link from 'next/link';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import { readingTime } from '../../utils/readingTime';

const mono = "font-['JetBrains_Mono']";

const BlogCard = ({ post }) => {
  const { minutes } = readingTime(post.content || post.summary || '');
  const thumb =
    post.mediaType === 'image'
      ? post.mediaUrl
      : post.mediaType === 'youtube'
      ? `https://img.youtube.com/vi/${post.mediaUrl}/hqdefault.jpg`
      : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-[#191818]/12 bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5def]/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-[#7cb5ff]/50"
    >
      <figure className="relative aspect-video overflow-hidden border-b border-[#191818]/10 dark:border-white/10">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#191818]/30 transition-colors group-hover:text-[#1b5def] dark:text-white/30 dark:group-hover:text-[#7cb5ff]" />
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
  );
};

export default BlogCard;
