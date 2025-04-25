import React from 'react';
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi';
import BuyMeAChai from './BuyMeAChai';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light dark:bg-surface-dark py-8">
      <div className="container mx-auto px-4">
        {/* Buy Me a Chai Section */}
        <div className="mb-8">
          <BuyMeAChai />
        </div>
      
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold gradient-text mb-2">Manjunathan R</div>
            <p className="text-gray-600 dark:text-gray-400">ML Engineer & Researcher</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            <Link href="/" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              About
            </Link>
            <Link href="/experience" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Experience
            </Link>
            <Link href="/projects" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Projects
            </Link>
            <Link href="/releases" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Releases
            </Link>
            <Link href="/contact" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/CodingBad02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/manjunathan-r-06396b1b7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/koffeewith.ai?igsh=MXF4bTk2MnB5Mzd3cA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram className="h-6 w-6" />
            </a>
            <a 
              href="mailto:manjunathan.ai02@gmail.com" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              aria-label="Email"
            >
              <FiMail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>© {currentYear} Manjunathan Radhakrishnan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;