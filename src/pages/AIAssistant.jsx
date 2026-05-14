import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Lock, Server, Database, Users, Building2, Briefcase, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';

export default function AIAssistant() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Private by design — your data stays yours, never leaked into public models",
    "Learns your documents, workflows, financial structure, and sales patterns",
    "Industry-specific training with structured enterprise logic",
    "Controlled architecture with granular access controls and SSO integration",
    "Real-time synthesis of business data for faster decision making"
  ];

  const privacyFeatures = [
    {
      icon: Server,
      title: "Controlled Architecture",
      description: "Private server instances with isolated memory stacks. Your intelligence runs in your perimeter."
    },
    {
      icon: Database,
      title: "Structured Data Environment",
      description: "Clean knowledge retrieval without hallucinations. Accurate responses from your verified data."
    },
    {
      icon: Users,
      title: "Defined Access Layers",
      description: "Granular RBAC controls integrated into your SSO. Control who sees what, always."
    },
    {
      icon: Lock,
      title: "Zero Data Leakage",
      description: "Your data stays yours. Never shared, never used for training public models."
    }
  ];

  const industries = [
    {
      icon: HardHat,
      name: "Construction",
      description: "Auto-generate safety compliance reports, predict material shortages, sync architect drawings with field updates."
    },
    {
      icon: Building2,
      name: "Property",
      description: "Streamline lease management, automate tenant communications, and synthesise market data for investment decisions."
    },
    {
      icon: Briefcase,
      name: "Professional Services",
      description: "Process legal documents, automate client reporting, and maintain data sovereignty for sensitive information."
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
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A private AI assistant trained for your business. Built for control. Designed for growth. 
              Intelligence secured within your perimeter.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Business. Augmented.</h2>
              <p className="text-gray-600 text-lg mb-6">
                Growth creates complexity — more decisions, more risk, more communication, more pressure. 
                AI Assistant is a secure AI layer integrated into your operations. Quiet. Precise. Controlled.
              </p>
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
                  <span className="text">Request Private Access</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <img 
                src="/ai-assistant2.webp"
                alt="AI Assistant Dashboard"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Section */}
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
                Private by Design
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your business intelligence is not public. We build walled gardens for enterprise knowledge, 
              ensuring that your most valuable asset—your data—remains strictly within your control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img 
              src="/ai-assistant3.webp"
              alt="AI Assistant Security Architecture"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quantified Results</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AI Assistant doesn't just process data; it accelerates the fundamental pulse of your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Reduction in Operational Drag</div>
              <p className="text-gray-600">Automated reporting across multiple active projects simultaneously.</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">2.4x</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Increase in Decision Velocity</div>
              <p className="text-gray-600">Real-time synthesis of financial and supply chain data points.</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Data Synthesis Accuracy</div>
              <p className="text-gray-600">Structured enterprise logic ensures reliable, hallucination-free outputs.</p>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img 
              src="/ai-assistant.webp"
              alt="AI Assistant Analytics"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
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
                Industry-Specific Intelligence
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI Assistant adapts to your specific industry logic, processing your data within your own secure perimeter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <industry.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {industry.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex justify-center pt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={scrollToContact}
              className="gold-button shine-button text-lg"
            >
              <span className="text">Book Executive Demo</span>
            </button>
          </motion.div>
        </div>
      </section>

      <div id="contact" className="bg-white">
        <ContactSection />
      </div>
    </div>
  );
}
