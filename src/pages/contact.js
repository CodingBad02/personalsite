// src/pages/contact.js
import React from 'react';
import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';
import ContactForm from '../components/ContactForm';

const Contact = () => (
  <MainLayout>
    <Head>
      <title>Contact | Manjunathan Radhakrishnan</title>
    </Head>
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <ContactForm />
    </section>
  </MainLayout>
);

export default Contact;