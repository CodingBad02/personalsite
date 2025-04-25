// src/components/blog/PostSummary.js
import React from 'react';
import Link from 'next/link';
import useVoting from '../../hooks/useVoting';
import VoteButton from './VoteButton';
import VoteCounter from './VoteCounter';

const PostSummary = ({ post }) => {
  // Use custom voting hook for localStorage persistence
  const { votes, voted, handleVote } = useVoting(post);

  return (
    <div className="flex bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      {/* Voting Section */}
      {/* Voting Section */}
      <div className="flex flex-col items-center justify-start p-4 bg-gray-100 dark:bg-gray-700">
        <VoteButton type="up" voted={voted} onClick={handleVote} size="small" />
        <VoteCounter count={votes} size="small" />
        <VoteButton type="down" voted={voted} onClick={handleVote} size="small" />
      </div>

      {/* Media Preview Section (Optional) */}
      {post.mediaType && post.mediaUrl && (
        <div className="flex-shrink-0 w-40 h-40 hidden md:flex items-center justify-center mr-4 overflow-hidden">
          <Link href={`/blog/${post.slug}`} className="block relative w-full h-full">
            {post.mediaType === 'image' && (
              <img
                src={post.mediaUrl} // Assumes /path/to/image.png for local or full URL for external
                alt={`${post.title} preview`}
                className="w-full h-full object-cover rounded-l-lg"
              />
            )}
            {post.mediaType === 'youtube' && (
              <img
                src={`https://img.youtube.com/vi/${post.mediaUrl}/mqdefault.jpg`}
                alt={`${post.title} YouTube preview`}
                className="w-full h-full object-cover rounded-l-lg"
              />
            )}
          </Link>
        </div>
      )}

      {/* Post Content Section */}
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.summary}</p>
        <div className="text-sm text-gray-500 dark:text-gray-500">
          <span>Posted on {post.date}</span>
          {/* Add author, tags etc. later if needed */}
        </div>
      </div>
    </div>
  );
};

export default PostSummary;