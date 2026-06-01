// src/pages/blog/[slug].js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft, FiEye } from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { getAllPostSlugs, getPostBySlug } from '../../data/blogPosts';
import useBlogStats from '../../hooks/useBlogStats';
import HeartButton from '../../components/blog/HeartButton';
import { readingTime } from '../../utils/readingTime';

const BlogPost = ({ post }) => {
  const router = useRouter();
  const { hits, hearts, you, atMax, addHeart } = useBlogStats(post?.slug);

  if (router.isFallback) return <MainLayout><div className="container-narrow pt-36 pb-20">Loading…</div></MainLayout>;
  if (!post) return <MainLayout><div className="container-narrow pt-36 pb-20">Post not found.</div></MainLayout>;

  const { minutes } = readingTime(post.content);

  return (
    <MainLayout>
      <Head><title>{post.title} | Writing</title></Head>

      <div className="min-h-screen bg-[#f4f4f4] text-[#191818] dark:bg-[#08090f] dark:text-[#f2f5ff]">
      <article className="container-narrow pt-36 pb-24">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors mb-8">
          <FiArrowLeft className="h-4 w-4" /> all writing
        </Link>

        <h1 className="display text-3xl md:text-5xl mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-gray-400 dark:text-gray-500 mb-10">
          <span>{post.date}</span>
          <span>·</span>
          <span>{minutes} min read</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><FiEye className="h-3.5 w-3.5" /> {hits == null ? '—' : hits.toLocaleString()} views</span>
        </div>

        {post.mediaType && post.mediaUrl && (
          <div className="mb-10">
            {post.mediaType === 'image' && (
              <img src={post.mediaUrl} alt={post.title} className="w-full h-auto rounded-xl border border-line-light dark:border-line-dark" />
            )}
            {post.mediaType === 'youtube' && (
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-line-light dark:border-line-dark">
                <iframe
                  src={`https://www.youtube.com/embed/${post.mediaUrl}`}
                  title={post.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            )}
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary-light dark:prose-a:text-primary-dark">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Heart */}
        <div className="mt-14 pt-8 border-t border-line-light dark:border-line-dark flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Enjoyed this? Tap the heart — as many times as you like.</p>
          <HeartButton hearts={hearts} you={you} atMax={atMax} onAdd={addHeart} />
        </div>
      </article>
      </div>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: true };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
}

export default BlogPost;
