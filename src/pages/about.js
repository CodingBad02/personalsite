// src/pages/about.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import { FiMusic, FiAward, FiUser, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SpotifyNowPlaying = () => {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center justify-center">
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
                Here's the deal: You can't outrun the AI revolution. Large Language Models and cutting-edge tech evolve faster than you can blink, shredding yesterday's machine learning playbook. Is that game over for us? Absolutely Goddamn not (Harvey Specter - Suits) —it's just getting started!
              </p>
              <p className="mb-4 text-lg">
                I'm Manjunathan Radhakrishnan, a Machine Learning Engineer and Researcher who thrives in this chaos. With a degree in Electronics and Communication Engineering from Sri Sivasubramaniya Nadar College of Engineering (CGPA: 9.02/10), I've got the backdrop and base knowledge to back it up. My battleground? Advanced computer vision, distributed training frameworks, and cloud-agnostic ML solutions - with a keen interest on designing efficient systems, hardware software hand in hand. I've built modified YOLO architectures to spot ships like a hawk and engineered agentic platforms at Mad Street Den (Vue.ai) that redefine what's possible. Innovation, efficiency, impact—that's my creed.
              </p>
              <p className="mb-4 text-lg">
                The rapid pace of AI isn't a hurdle; it's my adrenaline. I design systems, tweak models, and turn wild ideas into reality, whether it's scaling architectures or fine-tuning solutions that actually work. With a couple of years under my belt and a hunger to push limits, I'm here to tackle the toughest challenges and shape a future that doesn't just arrive—it dominates.
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
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I don't just play badminton—I dominate the court. Smashing it at least twice a week, I've honed lightning-fast reflexes, ninja-level agility, and a killer strategic mind. These aren't just game skills; they're the edge I bring to every project, slicing through problems with precision.
                  </p>
                  <a 
                    href="https://open.turftown.in/player/6422fb760aed8ea06016cf11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <img 
                      src="/images/turftown-logo.png" 
                      alt="TurfTown Logo" 
                      className="w-5 h-5"
                    />
                    Play with me on TurfTown
                  </a>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Fitness</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fitness isn't a pastime—it's my forge. I hammer out a split training regimen, crushing different muscle groups daily. The discipline? Unbreakable. The consistency? Relentless. It's the same grit I bring to my work, sculpting solutions as strong as my gains.
                  </p>
                  <a 
                    href="https://open.spotify.com/playlist/5L4B4a7wcyBt7t7bmXK5A7?si=cCCRViGeSyym1RIs1nHmfA&pi=_yIR6iDiSRORQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1AA34A] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    My Gym Playlist
                  </a>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Music</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    My playlist is a weapon—classic rock to hip-hop and R&B, I wield it all. It's the fuel that keeps me locked in during marathon coding sessions and the release that resets me after slaying the day. Music doesn't just play; it powers my grind.
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
                  Crushed it at MADHACK 24, delivering an ML healthcare solution that owned the competition.
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Smart India Hackathon finalist—built an IoT gait analysis system that rewrote the rules.
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Snagged the IEEE Catalyst award for groundbreaking Graph Convolutional Network research.
                </li>
                <li className="flex">
                  <span className="text-primary-light dark:text-primary-dark mr-2">•</span>
                  Locked down a scholarship at SSNCE for straight-up academic dominance.
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