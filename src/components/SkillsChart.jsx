import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../utils/theme-context';
import { FiStar } from 'react-icons/fi';

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme();
  
  // Convert proficiency percentage to experience level (1-5)
  const getProficiencyLevel = (proficiency) => {
    if (proficiency >= 95) return 5;
    if (proficiency >= 90) return 4.5;
    if (proficiency >= 85) return 4;
    if (proficiency >= 80) return 3.5;
    if (proficiency >= 75) return 3;
    return 2.5;
  };
  
  const level = getProficiencyLevel(skill.proficiency);
  
  // Create an array of stars based on the level
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(level);
    const hasHalfStar = level % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar 
          key={`full-${i}`} 
          className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" 
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <FiStar 
            className="absolute w-4 h-4 text-primary-light dark:text-primary-dark" 
          />
          <div className="absolute w-2 h-4 overflow-hidden">
            <FiStar 
              className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" 
            />
          </div>
        </div>
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar 
          key={`empty-${i}`} 
          className="w-4 h-4 text-gray-300 dark:text-gray-600" 
        />
      );
    }
    
    return stars;
  };

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
        <div className="flex">
          {renderStars()}
        </div>
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

  // Define categories for the skills
  const categories = {
    "Programming Languages": ["Python", "C/C++/CUDA"],
    "Machine Learning & AI": ["Machine Learning", "Deep Learning", "Computer Vision", "PyTorch", "TensorFlow"],
    "DevOps & Infrastructure": ["Cloud Platforms (AWS, GCP, Azure)", "Docker & Kubernetes", "Data Management"]
  };
  
  // Create category groups with skills
  const categoryGroups = Object.entries(categories).map(([category, skillNames]) => {
    const skills = data.filter(skill => skillNames.includes(skill.name));
    return { category, skills };
  });

  return (
    <div className="space-y-10">
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-6">Skills Proficiency Legend</h3>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="flex mr-2">
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
            </div>
            <span className="text-sm">Expert</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex mr-2">
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </div>
            <span className="text-sm">Advanced</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex mr-2">
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-primary-light dark:text-primary-dark fill-current" />
              <FiStar className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              <FiStar className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </div>
            <span className="text-sm">Intermediate</span>
          </div>
        </div>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryGroups.map(({category, skills}, categoryIndex) => (
          <motion.div
            key={category}
            ref={categoryIndex === 0 ? ref : null}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="card p-6"
          >
            <h3 className="text-xl font-bold mb-6">{category}</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsChart;