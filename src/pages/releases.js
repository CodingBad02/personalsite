import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiGift, FiClock, FiCheckCircle, FiAlertCircle, FiArrowUp, FiShield } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import releasesData from '../data/releases';

const ReleaseNotes = () => {
  return (
    <MainLayout>
      <Head>
        <title>Release Notes | Manjunathan Radhakrishnan</title>
      </Head>
      
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Release Notes</h1>
          
          {/* Current Version */}
          <div className="card p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mr-4">
                <FiGift className="h-5 w-5 text-primary-light dark:text-primary-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Current Version</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  v{releasesData.current.version} - {releasesData.current.date}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              {releasesData.current.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Features */}
          <div className="card p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-secondary-light/10 dark:bg-secondary-dark/10 flex items-center justify-center mr-4">
                <FiClock className="h-5 w-5 text-secondary-light dark:text-secondary-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Coming Soon</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  v{releasesData.upcoming.version} - Planned for {releasesData.upcoming.plannedDate}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              {releasesData.upcoming.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <FiAlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Changelog */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Changelog</h2>
            
            <div className="space-y-8">
              {releasesData.changelog.map((release, index) => (
                <div key={index} className="relative">
                  {/* Version line */}
                  {index !== releasesData.changelog.length - 1 && (
                    <div className="absolute left-2.5 top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                  )}
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mr-4 relative z-10">
                      <FiArrowUp className="h-4 w-4 text-primary-light dark:text-primary-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        Version {release.version}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                          {release.date}
                        </span>
                      </h3>
                      
                      <div className="mt-4 space-y-3">
                        {release.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="flex items-start">
                            <span className={`
                              px-2 py-1 text-xs font-medium rounded-full mr-3
                              ${change.type === 'feature' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                : change.type === 'improvement'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                                : change.type === 'security'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                              }
                            `}>
                              {change.type}
                            </span>
                            <p className="flex-1">{change.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default ReleaseNotes; 