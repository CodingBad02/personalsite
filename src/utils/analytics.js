export const trackPageView = (url) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.trackView(url);
    }
  };
  
  export const trackEvent = (eventName, eventData) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.trackEvent(eventName, eventData);
    }
  };