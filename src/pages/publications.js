// src/pages/publications.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import PublicationCard from '../components/PublicationCard';
import publicationsData from '../data/publications';

const Publications = () => (
  <MainLayout>
    <Head>
      <title>Publications | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Publications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publicationsData.map(pub => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
    </section>
  </MainLayout>
);

export default Publications;