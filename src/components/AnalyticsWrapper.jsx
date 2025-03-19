import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

const AnalyticsWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Function to process queued events
    const processQueue = () => {
      if (window._umamiQueue && window.umami) {
        while (window._umamiQueue.length > 0) {
          const [action, ...args] = window._umamiQueue.shift();
          if (window.umami[action]) {
            window.umami[action](...args);
          }
        }
      }
    };

    // Check if Umami is loaded and process queue
    const checkUmami = setInterval(() => {
      if (window.umami) {
        processQueue();
        clearInterval(checkUmami);
      }
    }, 100);

    // Track page view on initial load
    trackPageView(window.location.pathname);

    // Track page view on route change
    const handleRouteChange = (url) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      clearInterval(checkUmami);
    };
  }, [router.events]);

  return <>{children}</>;
};

export default AnalyticsWrapper;