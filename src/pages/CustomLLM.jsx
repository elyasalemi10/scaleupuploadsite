
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';

export default function CustomLLM() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Automate repetitive tasks and save hours every week",
    "Connect apps like Gmail, Slack, Notion, CRMs, and more",
    "Custom automations for lead generation, follow-ups, and support",
    "Full setup, testing, and support handled for you"
  ];

  const useCases = [
    {
      name: "AI Lead Scoring",
      description: "Qualifies leads from multiple sources with AI and routes them to the right sales rep."
    },
    {
      name: "Support Triage",
      description: "Uses sentiment analysis to prioritise urgent customer issues and auto-assign tickets."
    },
    {
      name: "Fraud Watch",
      description: "Flags suspicious e-commerce orders and alerts the fraud team in real-time."
    },
    {
      name: "Content Repurposer",
      description: "Turns videos or podcasts into blogs, social posts, and graphics automatically."
    },
    {
      name: "Renewal Trigger",
      description: "Sends personalised contract renewal offers before expiry and tracks responses."
    }
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
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Custom LLM Pipelines
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Custom large language model setups built for document processing, content creation, and knowledge management — plus end-to-end automations that streamline workflows, save time, and boost productivity across your business.
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
                  <span className="text">Discuss Your LLM Needs</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <img 
                src="/llm_pipelines_light.png"
                alt="Custom LLM Pipelines"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
               <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover how Custom LLM Pipelines can transform your business operations across various departments and industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card className="w-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col hover:-translate-y-2">
                  <CardContent className="p-6 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                      {useCase.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div id="contact" className="bg-white">
        <ContactSection />
      </div>
    </div>
  );
}
