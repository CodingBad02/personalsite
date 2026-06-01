import '../styles/globals.css';
import { ThemeProvider } from '../utils/theme-context';
import AnalyticsWrapper from '../components/AnalyticsWrapper';
import CommandPalette, { AskSunProvider } from '../components/CommandPalette';
import CustomCursor from '../components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const pageVariants = {
    initial: {
      opacity: 0,
      // x: "-100vw", // Example: Slide from left
    },
    in: {
      opacity: 1,
      // x: 0, // Example: Slide to center
    },
    out: {
      opacity: 0,
      // x: "100vw", // Example: Slide to right
    }
  };

  const pageTransition = {
    type: "tween", // Or "spring", "inertia"
    ease: "anticipate", // Example easing
    duration: 0.5 // Adjust duration as needed
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
          <AnimatePresence mode='wait'>
            <motion.div
                key={router.route}
                initial={false}
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <CommandPalette />
          <CustomCursor />
          <Analytics />
        </AnalyticsWrapper>
      </AskSunProvider>
    </ThemeProvider>
  );
}

export default MyApp;
