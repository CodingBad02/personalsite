import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const ProjectCard = ({ project, index }) => {
  const { title, description, image, technologies, githubLink, demoLink, longDescription } = project;
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
      className="card group h-full flex flex-col"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/images/projects/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-end space-x-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="View GitHub Repository"
              >
                <FiGithub className="h-6 w-6" />
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                aria-label="Read More About this!"
              >
                <FiExternalLink className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div 
        className="p-6 flex-grow flex flex-col cursor-pointer"
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
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <AnimatePresence>
          {isExpanded && longDescription && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium mb-2">Project Details</h4>
              <div className="prose dark:prose-invert">
                <ReactMarkdown>{longDescription}</ReactMarkdown>
              </div>
              
              <div className="flex space-x-4 mt-4">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-light dark:text-primary-dark hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub className="mr-2" />
                    View Code
                  </a>
                )}
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-light dark:text-primary-dark hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="mr-2" />
                    Read More
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;