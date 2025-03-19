import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '' // Honeypot field
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [captchaError, setCaptchaError] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError(false);
    
    // Verify reCAPTCHA
    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    
    setStatus('loading');
    
    try {
      // Send form data to your email service
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        _gotcha: ''
      });
      
      // Reset reCAPTCHA
      recaptchaRef.current.reset();
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - invisible to humans but bots will fill it */}
        <div style={{ display: 'none' }}>
          <label htmlFor="_gotcha">Leave this empty</label>
          <input
            type="text"
            id="_gotcha"
            name="_gotcha"
            value={formData._gotcha}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors"
              disabled={status === 'loading'}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors"
              disabled={status === 'loading'}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors"
            disabled={status === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors"
            disabled={status === 'loading'}
          ></textarea>
        </div>
        
        {/* reCAPTCHA */}
        <div className="flex flex-col items-start">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={() => setCaptchaError(false)}
          />
          {captchaError && (
            <p className="text-red-500 text-sm mt-2">Please verify that you are not a robot.</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`flex items-center justify-center px-6 py-3 w-full rounded-lg font-medium text-white transition-all duration-300 ${
            status === 'loading'
              ? 'bg-gray-400 dark:bg-gray-600 cursor-wait'
              : status === 'success'
              ? 'bg-green-500 dark:bg-green-600'
              : status === 'error'
              ? 'bg-red-500 dark:bg-red-600'
              : 'bg-primary-light dark:bg-primary-dark hover:opacity-90'
          }`}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : status === 'success' ? (
            <>
              <FiCheck className="mr-2 h-5 w-5" />
              Message Sent!
            </>
          ) : status === 'error' ? (
            <>
              <FiAlertTriangle className="mr-2 h-5 w-5" />
              Failed to Send
            </>
          ) : (
            <>
              <FiSend className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;