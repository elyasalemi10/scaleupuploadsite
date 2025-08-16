
import React from 'react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contact
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're here to help you navigate the world of AI. Reach out to schedule your free consultation or to ask any questions you may have.
            </motion.p>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
