// src/pages/skills.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import SkillsRadarChart from '../components/SkillsChartv2';

const Skills = () => (
  <MainLayout>
    <Head>
      <title>Skills | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Technical Skills</h1>
      <p className="text-lg mb-8">
        My technical expertise spans across multiple domains including programming languages, 
        machine learning frameworks, cloud platforms, and hardware systems.
      </p>
      <SkillsRadarChart />
    </section>
  </MainLayout>
);

export default Skills;