// src/pages/blog/index.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../../layouts/MainLayout';
import BlogCard from '../../components/blog/BlogCard';
import { EncryptedText } from '../../components/EncryptedText';
import { getAllPosts } from '../../data/blogPosts';

const serif = "font-['Instrument_Serif']";
const mono = "font-['JetBrains_Mono']";

const SectionHead = ({ num, kicker, title, children }) => (
  <div className="mb-10 flex gap-6 md:gap-10">
    <span className={`${serif} pt-1 text-2xl text-[#1b5def] dark:text-[#7cb5ff]`}>{num}</span>
    <div className="max-w-2xl">
      <span className={`${mono} mb-3 block text-xs tracking-wide text-[#191818]/40 dark:text-white/40`}>{kicker}</span>
      <h2 className={`${serif} mb-3 text-4xl leading-none text-[#191818] dark:text-[#f2f5ff] md:text-[52px]`}>
        <EncryptedText text={title} />
      </h2>
      {children && <p className="leading-relaxed text-[#191818]/70 dark:text-white/70">{children}</p>}
    </div>
  </div>
);

const BlogIndex = ({ posts }) => {
  const pinned = posts.filter((p) => p.pinned);
  const regular = posts.filter((p) => !p.pinned);

  return (
    <MainLayout>
      <Head><title>Writing | Manjunathan Radhakrishnan</title></Head>

      <div className="bg-[#f4f4f4] text-[#191818] font-['Plus_Jakarta_Sans'] dark:bg-[#08090f] dark:text-[#f2f5ff]">
        <div className="mx-auto max-w-[1100px] space-y-24 px-6 py-20 md:px-12">
          {/* 01 — intro */}
          <section>
            <SectionHead num="01" kicker="// page.writing" title="Writing">
              Notes on building AI products, research, and the occasional rabbit hole.
            </SectionHead>
          </section>

          {/* 02 — pinned */}
          {pinned.length > 0 && (
            <section>
              <SectionHead num="02" kicker="// pinned" title="Pinned">
                The ones worth starting with.
              </SectionHead>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pinned.map((post, i) => <BlogCard key={post.slug} post={post} index={i} />)}
              </div>
            </section>
          )}

          {/* 03 — all posts */}
          {regular.length > 0 && (
            <section>
              <SectionHead
                num={pinned.length > 0 ? '03' : '02'}
                kicker="// all.posts"
                title="All posts"
              >
                Everything else, newest first.
              </SectionHead>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regular.map((post, i) => <BlogCard key={post.slug} post={post} index={i} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}

export default BlogIndex;
