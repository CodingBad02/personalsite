// src/pages/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import MainLayout from '../layouts/MainLayout';
import { FiArrowRight, FiBriefcase, FiCode, FiAward, FiClipboard } from 'react-icons/fi';

// Sample data for latest experience
const latestExperience = {
  position: "Junior ML Engineer",
  company: "Mad Street Den (Vue.ai)",
  description: [
    "Leading restructuring for Product Tagging and Document Extraction using fine-tuned multimodal LLMs",
    "Building an agentic architecture for Vue-platform with RAG capabilities",
    "Engineering cloud provider agnostic solutions across GCP, AWS, and Azure"
  ],
  date: "April 2024 - Present"
};

// Sample data for featured projects
const featuredProjects = [
  {
    title: "TrainConv Framework",
    description: "A distributed training framework on PyTorch and TensorFlow with configuration-based pipelines and automated orchestration.",
    technologies: ["PyTorch", "TensorFlow", "Distributed Computing"]
  },
  {
    title: "DeepGait",
    description: "IoT-based intelligent gait analysis using a 6-axis IMU and force sensors with AWS integration.",
    technologies: ["Deep Learning", "IoT", "AWS"]
  },
  {
    title: "GCN for Pandemic Prediction",
    description: "Graph convolutional networks for predicting COVID-19 incidence in Indian states with 85.3% accuracy.",
    technologies: ["GCN", "Graph Neural Networks", "Machine Learning"]
  }
];

const IndexPage = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MainLayout>
      <Head>
        <title>Manjunathan Radhakrishnan | ML Engineer & Researcher</title>
        <meta
          name="description"
          content="Manjunathan Radhakrishnan is a Machine Learning Engineer and Researcher with expertise in agentic architecture, LLMs, and computer vision."
        />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Latest Work Section */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest <span className="gradient-text">Work</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Building intelligent systems and developing cutting-edge ML solutions.
            </motion.p>
          </div>

          <motion.div 
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {/* Latest Experience */}
            <motion.div 
              className="card p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mr-4">
                  <FiBriefcase className="h-6 w-6 text-primary-light dark:text-primary-dark" />
                </div>
                <h3 className="text-2xl font-bold">Latest Position</h3>
              </div>
              
              <h4 className="text-xl font-bold mb-2">{latestExperience.position}</h4>
              <h5 className="text-lg text-primary-light dark:text-primary-dark mb-2">{latestExperience.company}</h5>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{latestExperience.date}</p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                {latestExperience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <Link 
                href="/experience"
                className="flex items-center text-primary-light dark:text-primary-dark hover:underline font-medium"
              >
                View Full Experience
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Featured Projects */}
            <motion.div 
              className="card p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mr-4">
                  <FiCode className="h-6 w-6 text-primary-light dark:text-primary-dark" />
                </div>
                <h3 className="text-2xl font-bold">Featured Projects</h3>
              </div>
              
              <div className="space-y-6">
                {featuredProjects.map((project, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIdx) => (
                        <span 
                          key={techIdx}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/projects"
                  className="flex items-center text-primary-light dark:text-primary-dark hover:underline font-medium"
                >
                  View All Projects
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {/* Publications */}
            <motion.div 
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mx-auto mb-4">
                <FiClipboard className="h-8 w-8 text-primary-light dark:text-primary-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">Publications</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Published research work in IEEE conferences and journals.
              </p>
              <Link 
                href="/publications"
                className="flex items-center justify-center text-primary-light dark:text-primary-dark hover:underline font-medium"
              >
                View Publications
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Awards */}
            <motion.div 
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-8 w-8 text-primary-light dark:text-primary-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">Awards</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Winner of MADHACK 24, Smart India Hackathon, and IEEE Catalyst.
              </p>
              <Link 
                href="/about#awards"
                className="flex items-center justify-center text-primary-light dark:text-primary-dark hover:underline font-medium"
              >
                View Achievements
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            
            {/* Skills */}
            <motion.div 
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="h-16 w-16 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mx-auto mb-4">
                <FiCode className="h-8 w-8 text-primary-light dark:text-primary-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skills</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Expertise in Python, ML frameworks, Cloud platforms, and more.
              </p>
              <Link 
                href="/skills"
                className="flex items-center justify-center text-primary-light dark:text-primary-dark hover:underline font-medium"
              >
                View Skills
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Interested in working together?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's build something extraordinary together. Whether you have a project idea or just want to connect, I'd love to hear from you.
          </motion.p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-primary-light text-white dark:bg-primary-dark font-bold rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default IndexPage;