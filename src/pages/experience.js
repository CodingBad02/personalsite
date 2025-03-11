// src/pages/experience.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ExperienceTimeline from '../components/ExperienceTimeline';
import experienceData from '../data/experience';

const Experience = () => (
  <MainLayout>
    <Head>
      <title>Experience | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Experience</h1>
      <ExperienceTimeline data={experienceData} />
    </section>
  </MainLayout>
);

export default Experience;