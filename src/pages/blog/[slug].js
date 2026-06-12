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
import ReadingProgress from '../../components/motion/ReadingProgress';
import Reveal from '../../components/motion/Reveal';
import { readingTime } from '../../utils/readingTime';

const mono = "font-['JetBrains_Mono']";

const BlogPost = ({ post }) => {
  const router = useRouter();
  const { hits, hearts, you, atMax, addHeart } = useBlogStats(post?.slug);

  if (router.isFallback) return <MainLayout><div className="container-narrow pt-36 pb-20">Loading…</div></MainLayout>;
  if (!post) return <MainLayout><div className="container-narrow pt-36 pb-20">Post not found.</div></MainLayout>;

  const { minutes } = readingTime(post.content);

  return (
    <MainLayout>
      <Head><title>{post.title} | Writing</title></Head>
      <ReadingProgress />

      <div className="min-h-screen bg-[#f4f4f4] text-[#191818] font-['Plus_Jakarta_Sans'] dark:bg-[#08090f] dark:text-[#f2f5ff]">
      <article className="container-narrow pt-36 pb-24">
        <Reveal y={14}>
          <Link href="/blog" className={`${mono} group inline-flex items-center gap-1.5 text-xs text-[#191818]/55 transition-colors hover:text-[#1b5def] dark:text-white/50 dark:hover:text-[#7cb5ff] mb-8`}>
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> all writing
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <span className={`${mono} mb-4 block text-xs text-[#191818]/40 dark:text-white/40`}>// writing.post</span>
          <h1 className="mb-4 font-heading text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        </Reveal>

        <Reveal delay={0.1} className={`${mono} mb-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#191818]/45 dark:text-white/45`}>
          <span>{post.date}</span>
          <span className="text-[#1b5def] dark:text-[#7cb5ff]">·</span>
          <span>{minutes} min read</span>
          <span className="text-[#1b5def] dark:text-[#7cb5ff]">·</span>
          <span className="inline-flex items-center gap-1"><FiEye className="h-3.5 w-3.5" /> {hits == null ? '—' : hits.toLocaleString()} views</span>
        </Reveal>

        {post.mediaType && post.mediaUrl && (
          <Reveal delay={0.15} className="mb-10">
            {post.mediaType === 'image' && (
              <figure className="img-frame shadow-[0_18px_60px_rgba(25,24,24,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
                <img src={post.mediaUrl} alt={post.title} loading="lazy" decoding="async" className="h-auto w-full" />
              </figure>
            )}
            {post.mediaType === 'youtube' && (
              <div className="img-frame aspect-w-16 aspect-h-9">
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
          </Reveal>
        )}

        <div className="prose dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-[#1b5def] dark:prose-a:text-[#7cb5ff] prose-img:border prose-img:border-[#191818]/12 dark:prose-img:border-white/10">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Heart */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-[#191818]/10 pt-8 text-center dark:border-white/10">
          <p className="text-sm text-[#191818]/55 dark:text-white/55">Enjoyed this? Tap the heart — as many times as you like.</p>
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
