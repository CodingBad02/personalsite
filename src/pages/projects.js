// src/pages/projects.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects';

const Projects = () => (
  <MainLayout>
    <Head>
      <title>Projects | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  </MainLayout>
);

export default Projects;