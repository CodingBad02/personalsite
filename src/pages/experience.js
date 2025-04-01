// src/pages/experience.js
import React, { useState } from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ExperienceTimeline from '../components/ExperienceTimeline';
import experienceData from '../data/experience';
import educationData from '../data/education';
import { FiBriefcase, FiBook } from 'react-icons/fi';

const Experience = () => {
  const [showExperience, setShowExperience] = useState(true);

  return (
    <MainLayout>
      <Head>
        <title>Experience | Manjunathan Radhakrishnan</title>
      </Head>
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          {showExperience ? 'Experience' : 'Education'}
        </h1>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex">
            <button 
              onClick={() => setShowExperience(true)}
              className={`flex items-center px-4 py-2 rounded-md transition-all ${
                showExperience 
                  ? 'bg-primary-light dark:bg-primary-dark text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FiBriefcase className="mr-2" />
              Work Experience
            </button>
            <button 
              onClick={() => setShowExperience(false)}
              className={`flex items-center px-4 py-2 rounded-md transition-all ${
                !showExperience 
                  ? 'bg-primary-light dark:bg-primary-dark text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FiBook className="mr-2" />
              Education
            </button>
          </div>
        </div>

        <ExperienceTimeline data={showExperience ? experienceData : educationData} />
      </section>
    </MainLayout>
  );
};

export default Experience;