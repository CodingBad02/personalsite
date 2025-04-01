import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CompanyLogo = ({ company, logo, selected, onClick, date, isEducation }) => {
  // Default paths for logos
  const defaultLogo = isEducation 
    ? `/images/education/${company.toLowerCase().replace(/\s+/g, '-')}.png`
    : `/images/companies/${company.toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <motion.div
      className={`relative z-10 cursor-pointer transition-all duration-300 ${
        selected ? 'flex-1 max-w-xs' : 'w-20 sm:w-28 flex-shrink-0'
      }`}
      onClick={onClick}
      whileHover={{ scale: selected ? 1 : 1.05 }}
    >
      <div 
        className={`
          h-16 rounded-lg overflow-hidden border-2
          ${selected 
            ? 'border-primary-light dark:border-primary-dark shadow-lg' 
            : 'border-gray-200 dark:border-gray-700 opacity-70'
          }
        `}
      >
        <img 
          src={logo || defaultLogo}
          alt={company} 
          className="w-full h-full object-contain p-2"
        />
      </div>
      <div className="mt-2 text-center text-sm font-medium truncate">
        {company}
      </div>
      <div className="text-xs text-gray-500 text-center truncate">
        {date.split(' - ')[0]}
      </div>
    </motion.div>
  );
};

const ExperienceTimeline = ({ data }) => {
  const [selectedCompany, setSelectedCompany] = useState(0);
  // Determine if this is education data
  const isEducation = data.length > 0 && data[0].company && 
    (data[0].company.includes('School') || data[0].company.includes('College') || data[0].company.includes('University'));
  
  // Sort data by date (most recent first)
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date.split(' - ')[0]);
    const dateB = new Date(b.date.split(' - ')[0]);
    return dateB - dateA;
  });

  const handleSelectCompany = (index) => {
    setSelectedCompany(index === selectedCompany ? null : index);
  };

  return (
    <div className="py-12">
      {/* Timeline container */}
      <div className="relative mb-16">
        {/* Timeline line */}
        <div className="absolute h-0.5 bg-gray-200 dark:bg-gray-700 top-8 left-0 right-0"></div>
        
        {/* Timeline dots and company logos */}
        <div className="relative flex justify-between mb-8">
          {sortedData.map((exp, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <CompanyLogo
                company={exp.company}
                logo={exp.logo}
                date={exp.date}
                selected={index === selectedCompany}
                onClick={() => handleSelectCompany(index)}
                isEducation={isEducation}
              />
              <div 
                className={`absolute top-8 w-4 h-4 rounded-full border-2 ${
                  index === selectedCompany 
                    ? 'bg-primary-light dark:bg-primary-dark border-white dark:border-slate-800' 
                    : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected company details */}
      <AnimatePresence mode="wait">
        {selectedCompany !== null && (
          <motion.div
            key={selectedCompany}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2">
              {sortedData[selectedCompany].position}
            </h3>
            <h4 className="text-xl font-medium mb-1">{sortedData[selectedCompany].company}</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{sortedData[selectedCompany].date}</p>
            
            <h5 className="font-medium mb-3">
              {isEducation ? 'Achievements & Activities:' : 'Responsibilities:'}
            </h5>
            <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
              {sortedData[selectedCompany].description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Instructions if no company selected */}
      {selectedCompany === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Click on {isEducation ? 'an institution' : 'a company'} logo on the timeline to view details
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ExperienceTimeline;