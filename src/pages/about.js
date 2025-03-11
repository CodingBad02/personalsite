// src/pages/about.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import { FiMusic, FiAward, FiUser, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SpotifyNowPlaying = () => {
  // Replace the static content with an <img> pointing to your Flask endpoint
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center justify-center">
      {/* Adjust localhost:5000 to wherever your Flask server is running */}
      <img 
        src="https://codingbad02.pythonanywhere.com/now-playing" 
        alt="Spotify Now Playing" 
        className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded shadow"
      />
    </div>
  );
};

const About = () => {
  return (
    <MainLayout>
      <Head>
        <title>About | Manjunathan Radhakrishnan</title>
      </Head>
      
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main content - Professional info */}
          <div className="md:col-span-2 space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4 text-lg">
                I'm Manjunathan Radhakrishnan, a passionate Machine Learning Engineer and Researcher with a background in Electronics and Communication Engineering from Sri Sivasubramaniya Nadar College of Engineering (CGPA: 9.02/10). My expertise spans advanced computer vision, distributed training frameworks, and cloud-agnostic ML solutions.
              </p>
              <p className="mb-4 text-lg">
                I have contributed both in academic research and in industry projects – from developing modified YOLO architectures for ship detection to building agentic platforms at Mad Street Den (Vue.ai). My work reflects a commitment to innovation, efficiency, and impactful technological solutions.
              </p>
              <p className="text-lg">
                With a solid technical foundation and a drive to continuously learn and push boundaries, I am excited to tackle new challenges and collaborate on cutting-edge projects.
              </p>
            </div>
            
            {/* Personal Interests */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <FiHeart className="h-6 w-6 text-primary-light dark:text-primary-dark mr-2" />
                <h2 className="text-2xl font-bold">Personal Interests</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Badminton</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    I'm an avid badminton player, hitting the courts at least twice a week. The sport has taught me quick decision-making, agility, and the importance of strategy - skills that translate well into my professional life.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Fitness</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Working out is an essential part of my routine. I follow a split training regimen focusing on different muscle groups each day. The discipline and consistency required in fitness mirrors the approach I take in my work.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Music</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    I have a diverse taste in music, ranging from classic rock to modern hip-hop and R&B. Music helps me focus during coding sessions and unwind after a long day.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Awards Section */}
            <div className="card p-6" id="awards">
              <div className="flex items-center mb-4">
                <FiAward className="h-6 w-6 text-primary-light dark:text-primary-dark mr-2" />
                <h2 className="text-2xl font-bold">Awards & Achievements</h2>
              </div>
              
              <ul className="space-y-3">
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Winner of MADHACK 24, building an innovative ML solution for healthcare
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Smart India Hackathon finalist - Developed an IoT-based gait analysis system
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  IEEE Catalyst award for research on Graph Convolutional Networks
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Scholarship recipient for academic excellence at SSNCE
                </li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar - Photos, current activity */}
          <div className="space-y-6">
            {/* Profile */}
            <motion.div 
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary-light dark:border-primary-dark">
                <img 
                  src="/images/profile.jpg" 
                  alt="Manjunathan Radhakrishnan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold mb-1">Manjunathan R</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Chennai, India</p>
              
              <div className="flex justify-center space-x-2">
                <div className="px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 rounded-full text-sm">
                  AI Engineer
                </div>
                <div className="px-3 py-1 bg-secondary-light/10 dark:bg-secondary-dark/10 rounded-full text-sm">
                  Researcher
                </div>
              </div>
            </motion.div>
            
            {/* Now Playing */}
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">Now Playing  🎧</h3>
              <SpotifyNowPlaying />
            </motion.div>
            
            {/* Gallery */}
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/gallery/badminton.jpg" alt="Playing badminton" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/gallery/workout.jpg" alt="At the gym" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/gallery/coding.jpg" alt="Coding session" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/gallery/hiking.jpg" alt="Hiking" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;