import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ position, company, date, description, isLeft, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md"
    >
      <div className={`arrow-${isLeft ? 'left' : 'right'}`}></div>
      
      <h3 className="text-xl font-bold text-primary-light dark:text-primary-dark">{position}</h3>
      <h4 className="text-lg font-medium mb-1">{company}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{date}</p>
      
      <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
        {description.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TimelineItem; 