import '../styles/globals.css';
import { ThemeProvider } from '../utils/theme-context';
import AnalyticsWrapper from '../components/AnalyticsWrapper';
import CommandPalette, { AskSunProvider } from '../components/CommandPalette';
import CustomCursor from '../components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Script from 'next/script';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useRouter } from 'next/router';
import { EASE } from '../utils/motion';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Opacity only — the route wrapper contains fixed elements (navbar,
  // home bottom nav), and transforms/filters would re-anchor them.
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
    out: { opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
  };
  return (
    <ThemeProvider>
      <Head>
        <title>Manjunathan Radhakrishnan | AI Solutions Architect</title>
        <meta name="description" content="Manjunathan Radhakrishnan — AI Solutions Architect. I build AI products people use, making businesses AI-native." />
        <link rel="icon" href="/images/websitelogo.png" />
        <link rel="shortcut icon" href="/images/websitelogo.png" />
        <link rel="apple-touch-icon" href="/images/websitelogo.png" />
      </Head>
      {/* Umami Analytics */}
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="7713b8c5-ec0e-495a-bf71-635053830cc3"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Umami Analytics loaded successfully');
        }}
        onError={(e) => {
          console.error('Error loading Umami Analytics:', e);
        }}
      />
      <AskSunProvider>
        <AnalyticsWrapper>
          <MotionConfig reducedMotion="user">
          <AnimatePresence mode='wait'>
            <motion.div
                key={router.route}
                initial={false}
                animate="in"
                exit="out"
                variants={pageVariants}
              >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          </MotionConfig>
          <CommandPalette />
          <CustomCursor />
          <Analytics />
        </AnalyticsWrapper>
      </AskSunProvider>
    </ThemeProvider>
  );
}

export default MyApp;
