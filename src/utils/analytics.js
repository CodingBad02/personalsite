export const trackPageView = (url) => {
  try {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.trackView(url);
    } else {
      // Queue the page view if Umami isn't loaded yet
      if (typeof window !== 'undefined') {
        window._umamiQueue = window._umamiQueue || [];
        window._umamiQueue.push(['trackView', url]);
      }
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const trackEvent = (eventName, eventData) => {
  try {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.trackEvent(eventName, eventData);
    } else {
      // Queue the event if Umami isn't loaded yet
      if (typeof window !== 'undefined') {
        window._umamiQueue = window._umamiQueue || [];
        window._umamiQueue.push(['trackEvent', eventName, eventData]);
      }
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};