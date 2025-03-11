import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../utils/theme-context';

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 5 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            backgroundColor: theme === 'dark' 
              ? 'rgb(139, 92, 246)' // primary-dark
              : 'rgb(124, 58, 237)', // primary-light
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const SkillsChart = ({ data }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Group skills into categories based on proficiency ranges
  const expertSkills = data.filter(skill => skill.proficiency >= 90);
  const advancedSkills = data.filter(skill => skill.proficiency >= 80 && skill.proficiency < 90);
  const intermediateSkills = data.filter(skill => skill.proficiency < 80);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-xl font-bold mb-6">Expert</h3>
        <div className="space-y-4">
          {expertSkills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <h3 className="text-xl font-bold mb-6">Advanced</h3>
        <div className="space-y-4">
          {advancedSkills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-xl font-bold mb-6">Intermediate</h3>
        <div className="space-y-4">
          {intermediateSkills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsChart;