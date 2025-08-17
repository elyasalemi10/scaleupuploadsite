import React from 'react';
import { CheckCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';
import StandaloneFaceDetection from '../components/StandaloneFaceDetection';

export default function ComputerVisionTools() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Detect and analyse objects, faces and text in images or video",
    "Automate visual tasks like quality checks, inventory tracking, and ID scanning",
    "Real-time image/video processing with high accuracy",
    "End-to-end setup, deployment, and support provided"
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Computer Vision Tools
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced image and video processing solutions for quality control, inventory management, and automated inspection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <button 
                  onClick={scrollToContact}
                  className="gold-button shine-button text-lg"
                >
                  <span className="text">Explore Computer Vision</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <img 
                src="/computer_vision_tools_light.png"
                alt="Computer Vision Tools"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Camera Feed Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Live Face Detection Demo</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience real-time AI face detection with age, gender, and emotion analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
                                <StandaloneFaceDetection />
          </motion.div>
        </div>
      </section>

      <div id="contact" className="bg-gray-900">
        <ContactSection />
      </div>
    </div>
  );
}