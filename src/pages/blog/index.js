// src/pages/blog/index.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../../layouts/MainLayout';
import PostSummary from '../../components/blog/PostSummary';
import { getAllPosts } from '../../data/blogPosts'; // We'll create this function

const BlogIndex = ({ posts }) => {
  // Separate pinned posts from regular posts
  const pinnedPosts = posts.filter(post => post.pinned);
  const regularPosts = posts.filter(post => !post.pinned);

  return (
    <MainLayout>
      <Head>
        <title>Blog | Manjunathan Radhakrishnan</title>
      </Head>
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Blog Feed</h1>
        
        {/* Pinned Posts Section */}
        {pinnedPosts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                <path d="M3 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              </svg>
              Pinned Posts
            </h2>
            <div className="space-y-8">
              {pinnedPosts.map(post => (
                <div key={post.slug} className="border-l-4 border-blue-500 pl-4">
                  <PostSummary post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Regular Posts Section */}
        <div className="space-y-8">
          {regularPosts.map(post => (
            <PostSummary key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts(); // Fetch posts at build time
  return {
    props: {
      posts,
    },
  };
}

export default BlogIndex;