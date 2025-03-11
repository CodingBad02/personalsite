import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

const AnalyticsWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Track page view on initial load
    trackPageView(window.location.pathname);

    // Track page view on route change
    const handleRouteChange = (url) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <>{children}</>;
};

export default AnalyticsWrapper;