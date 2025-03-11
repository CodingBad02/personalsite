// src/pages/contact.js
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ContactForm from '../components/ContactForm';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const Contact = () => {
  const calendlyInitialized = useRef(false);

  // Use useEffect to ensure Calendly initializes after component mounts
  useEffect(() => {
    // Only attempt to initialize once
    if (calendlyInitialized.current) return;
    
    // Function to initialize Calendly
    const initCalendly = () => {
      if (typeof window !== 'undefined' && window.Calendly) {
        try {
          // Remove any existing widget first
          const existingWidget = document.querySelector('.calendly-badge-widget');
          if (existingWidget) {
            existingWidget.remove();
          }
          
          // Initialize the widget
          window.Calendly.initBadgeWidget({
            url: 'https://calendly.com/manjunathan-ai02/30min',
            text: 'Schedule time with me',
            color: '#7C3AED',
            textColor: '#ffffff'
          });
          
          calendlyInitialized.current = true;
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      } else {
        // If Calendly isn't available yet, try again after a short delay
        setTimeout(initCalendly, 500);
      }
    };

    // Load Calendly script dynamically
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initCalendly;
      document.body.appendChild(script);
      
      // Also add the CSS
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // This will run when component unmounts
    return () => {
      // Remove any Calendly elements when navigating away
      if (typeof window !== 'undefined') {
        const calendlyWidget = document.querySelector('.calendly-badge-widget');
        if (calendlyWidget) {
          calendlyWidget.remove();
        }
      }
    };
  }, []);
  
  return (
    <MainLayout>
      <Head>
        <title>Contact | Manjunathan Radhakrishnan</title>
      </Head>
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        
        {/* Recruiting callout */}
        <div className="bg-gradient-to-r from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 rounded-lg p-6 mb-10">
          <div className="flex items-start space-x-4">
            <div className="bg-primary-light/20 dark:bg-primary-dark/20 p-3 rounded-full">
              <FiCalendar className="h-6 w-6 text-primary-light dark:text-primary-dark" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Looking to discuss job opportunities?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you're a recruiter or hiring manager interested in discussing potential roles, I'd be happy to schedule a dedicated time to chat. You can use the "Schedule time with me" button that appears at the bottom right of this page to book a convenient 30-minute slot.
              </p>
              <a 
                href="https://calendly.com/manjunathan-ai02/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-light dark:text-primary-dark font-medium hover:underline"
              >
                Book a conversation <FiArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </section>
    </MainLayout>
  );
};

export default Contact;