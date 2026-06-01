// src/pages/privacy.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';

const Section = ({ n, title, children }) => (
  <section className="mb-10">
    <h2 className="flex items-baseline gap-3 text-lg font-semibold mb-3">
      <span className="font-mono text-sm accent-text">{n}</span> {title}
    </h2>
    <div className="space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed">{children}</div>
  </section>
);

const Privacy = () => (
  <MainLayout>
    <Head>
      <title>Privacy | Manjunathan Radhakrishnan</title>
      <meta name="description" content="Privacy policy for manjunathan.me and the Sun CLI." />
    </Head>

    <div className="container-narrow pt-36 pb-20">
      <p className="label-mono mb-2">~/privacy</p>
      <h1 className="display text-4xl md:text-5xl mb-3">Privacy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">
        Short version: I collect almost nothing, and I don't sell anything. Last updated May 2026.
      </p>

      <Section n="01" title="Analytics">
        <p>I use privacy-friendly, cookieless analytics (Umami) to see rough page-view counts. It doesn't track you across sites or store personal identifiers.</p>
      </Section>

      <Section n="02" title="The Sun CLI">
        <p>When you ask the <Link href="/cli" className="accent-text hover:underline">CLI</Link> a question, your text is sent to <strong>Google Gemini</strong> to generate a reply, and to my server only to relay it. I don't build a profile of you from it.</p>
        <p>Because the prompt goes to Google, it's also subject to Google's API terms and privacy policy. <strong>Please don't type secrets or sensitive personal info</strong> into the CLI.</p>
      </Section>

      <Section n="03" title="Contact form">
        <p>If you use the <Link href="/contact" className="accent-text hover:underline">contact form</Link>, the name, email, and message you submit are emailed to me so I can reply. That's it — they're not added to any marketing list.</p>
      </Section>

      <Section n="04" title="What I don't do">
        <p>No selling or renting your data. No ad networks. No cross-site tracking. No accounts to manage.</p>
      </Section>

      <Section n="05" title="Contact">
        <p>Want something removed or have a question? Email <a href="mailto:manjunathan.ai02@gmail.com" className="accent-text hover:underline">manjunathan.ai02@gmail.com</a>. See also the <Link href="/terms" className="accent-text hover:underline">Terms</Link>.</p>
      </Section>
    </div>
  </MainLayout>
);

export default Privacy;
