// src/pages/blog/[slug].js
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { getAllPostSlugs, getPostBySlug } from '../../data/blogPosts';
import useVoting from '../../hooks/useVoting';
import VoteButton from '../../components/blog/VoteButton';
import VoteCounter from '../../components/blog/VoteCounter';

const BlogPost = ({ post }) => {
  const router = useRouter();

  // Use custom voting hook for localStorage persistence
  const { votes, voted, handleVote } = useVoting(post);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>; // Handle case where post is not found
  };

  return (
    <MainLayout>
      <Head>
        <title>{post.title} | Blog</title>
      </Head>
      <section className="py-20 container mx-auto px-4">
        <article className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 md:p-8">
          <div className="flex items-start mb-6">
            {/* Voting Section (similar to PostSummary but maybe styled differently for the page) */}
            <div className="flex flex-col items-center justify-start mr-4 pt-1">
              <VoteButton type="up" voted={voted} onClick={handleVote} size="large" />
              <VoteCounter count={votes} size="large" />
              <VoteButton type="down" voted={voted} onClick={handleVote} size="large" />
            </div>

            {/* Post Header */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">{post.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                Posted on {post.date} - Type: {post.type}
              </p>
            </div>
          </div>

          {/* Media Display Section (Full Image or YouTube Embed) */}
          {post.mediaType && post.mediaUrl && (
            <div className="mb-6">
              {post.mediaType === 'image' && (
                <img
                  src={post.mediaUrl} // Assumes /path/to/image.png for local or full URL for external
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              )}
              {post.mediaType === 'youtube' && (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    src={`https://www.youtube.com/embed/${post.mediaUrl}`}
                    title={post.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          )}

          {/* Post Content */}
          <div className="prose dark:prose-invert max-w-none">
            {/* Render content - assumes simple text for now, could use markdown renderer */}
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: true, // or 'blocking' or false depending on needs
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // Optional: Revalidate page every 60 seconds
  };
}

export default BlogPost;