// src/pages/skills.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import SkillsChart from '../components/SkillsChart';
import skillsData from '../data/skills';

const Skills = () => (
  <MainLayout>
    <Head>
      <title>Skills | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Skills</h1>
      <SkillsChart data={skillsData} />
    </section>
  </MainLayout>
);

export default Skills;