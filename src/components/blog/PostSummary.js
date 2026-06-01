// src/components/blog/PostSummary.js
import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { readingTime } from '../../utils/readingTime';

const PostSummary = ({ post }) => {
  const { minutes } = readingTime(post.content || post.summary || '');
  const thumb =
    post.mediaType === 'image' ? post.mediaUrl :
    post.mediaType === 'youtube' ? `https://img.youtube.com/vi/${post.mediaUrl}/mqdefault.jpg` : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-5 py-6">
      {thumb && (
        <div className="hidden sm:block shrink-0 w-28 h-20 overflow-hidden rounded-lg border border-line-light dark:border-line-dark">
          <img src={thumb} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
            {post.title}
          </h2>
          <FiArrowUpRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1 line-clamp-2">{post.summary}</p>
        <p className="font-mono text-xs text-gray-400 dark:text-gray-500 mt-2">
          {post.date} · {minutes} min read{post.type ? ` · ${post.type}` : ''}
        </p>
      </div>
    </Link>
  );
};

export default PostSummary;
