// src/pages/contact.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ContactForm from '../components/ContactForm';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const Contact = () => (
  <MainLayout>
    <Head>
      <title>Contact | Manjunathan Radhakrishnan</title>
      {/* Calendly badge widget scripts */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      <script 
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window.onload = function() { 
              Calendly.initBadgeWidget({ 
                url: 'https://calendly.com/manjunathan-ai02/30min', 
                text: 'Schedule time with me', 
                color: '#7C3AED', 
                textColor: '#ffffff' 
              }); 
            }
          `
        }}
      />
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

export default Contact;