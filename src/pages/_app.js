import '../styles/globals.css';
import { ThemeProvider } from '../utils/theme-context';
import AnalyticsWrapper from '../components/AnalyticsWrapper';
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
        <title>Manjunathan Radhakrishnan | ML Engineer & Researcher</title>
        <meta name="description" content="Personal website of Manjunathan Radhakrishnan, Machine Learning Engineer and Researcher" />
        <link rel="icon" href="/images/websitelogo.png" />
        <link rel="shortcut icon" href="/images/websitelogo.png" />
        <link rel="apple-touch-icon" href="/images/websitelogo.png" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
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
      <AnalyticsWrapper>
        <AnimatePresence mode='wait'>
          <motion.div 
              key={router.route} 
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AnalyticsWrapper>
    </ThemeProvider>
  );
}

export default MyApp;