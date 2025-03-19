import '../styles/globals.css';
import { ThemeProvider } from '../utils/theme-context';
import AnalyticsWrapper from '../components/AnalyticsWrapper';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>Manjunathan Radhakrishnan | ML Engineer & Researcher</title>
        <meta name="description" content="Personal website of Manjunathan Radhakrishnan, Machine Learning Engineer and Researcher" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
        {/* Umami Analytics */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="7713b8c5-ec0e-495a-bf71-635053830cc3"></script>
      </Head>
      <AnalyticsWrapper>
        <Component {...pageProps} />
      </AnalyticsWrapper>
    </ThemeProvider>
  );
}

export default MyApp;