import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiFileText, FiExternalLink, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PublicationCard = ({ publication, index }) => {
  const { title, authors, conference, date, link, doi, description, location } = publication;
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden"
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-3 pr-6">{title}</h3>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <FiChevronUp className="h-5 w-5" />
            ) : (
              <FiChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {authors && <p className="text-gray-600 dark:text-gray-400 mb-2">{authors}</p>}
        
        <div className="flex flex-wrap gap-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-400 mr-4">
            <FiFileText className="mr-2 flex-shrink-0" />
            <span>{conference}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mr-4">
            <FiCalendar className="mr-2 flex-shrink-0" />
            <span>{date}</span>
          </div>
          
          {location && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FiMapPin className="mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 overflow-hidden"
          >
            {description && (
              <div className="py-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2">Abstract</h4>
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
              </div>
            )}
            
            {(link || doi) && (
              <div className="flex space-x-4 py-4 border-t border-gray-200 dark:border-gray-700">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-light dark:text-primary-dark hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="mr-2" />
                    Read Paper
                  </a>
                )}
                {doi && (
                  <a
                    href={doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light hover:dark:text-primary-dark"
                    onClick={(e) => e.stopPropagation()}
                  >
                    DOI: {doi.split('/').pop()}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PublicationCard;