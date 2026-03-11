import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, Bot, Sparkles, Eye, MessageSquare, BarChart3, Settings, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';

export default function IntelligentWebsites() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "AI-powered chatbots and virtual assistants embedded directly into your site",
    "Augmented Reality (AR) product visualisation and interactive experiences",
    "Intelligent search and personalised content recommendations",
    "Real-time analytics dashboards and admin panels",
    "Voice-enabled navigation and accessibility features"
  ];

  const capabilities = [
    {
      icon: Bot,
      title: "AI Chatbots & Assistants",
      description: "24/7 intelligent support that answers questions, books appointments, and guides users through your site with natural conversation."
    },
    {
      icon: Eye,
      title: "AR Product Visualisation",
      description: "Let customers see products in their space before buying. Perfect for furniture, fashion, and home decor businesses."
    },
    {
      icon: Sparkles,
      title: "Smart Personalisation",
      description: "Content that adapts to each visitor. Show relevant products, articles, and offers based on behaviour and preferences."
    },
    {
      icon: MessageSquare,
      title: "Voice & Accessibility",
      description: "Voice-enabled navigation, screen reader optimisation, and intelligent accessibility features for all users."
    },
    {
      icon: BarChart3,
      title: "Live Analytics Dashboard",
      description: "Real-time insights into visitor behaviour, conversions, and AI performance. Make data-driven decisions instantly."
    },
    {
      icon: Settings,
      title: "Powerful Admin Panel",
      description: "Manage content, update AI responses, review analytics, and control every aspect of your intelligent website."
    }
  ];

  const useCases = [
    {
      industry: "E-Commerce",
      features: ["AR try-on for products", "AI shopping assistant", "Personalised recommendations", "Inventory sync"]
    },
    {
      industry: "Real Estate",
      features: ["Virtual property tours", "AI property matching", "Mortgage calculators", "Automated scheduling"]
    },
    {
      industry: "Healthcare",
      features: ["Symptom checker chatbot", "Appointment booking AI", "Patient portal", "HIPAA-compliant forms"]
    },
    {
      industry: "Professional Services",
      features: ["Lead qualification bot", "Document automation", "Client portal", "Smart scheduling"]
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
                <Globe className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Intelligent Websites
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Websites that think, adapt, and engage. We build stunning websites with AI, AR, and smart features 
              that transform visitors into customers.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">More Than Just a Website</h2>
              <p className="text-gray-600 text-lg mb-6">
                Traditional websites are static brochures. Intelligent websites are dynamic experiences that 
                understand your visitors, anticipate their needs, and guide them to action.
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
                  <span className="text">Build Your Intelligent Website</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div className="h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <div className="h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
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
                Intelligent Capabilities
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every feature is designed to make your website work harder for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <capability.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {capability.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Every Industry</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We tailor intelligent features to your specific industry needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {useCase.industry}
                    </h3>
                    <ul className="space-y-2">
                      {useCase.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
              <span className="text">Discuss Your Project</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
                How We Build It
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We learn your business, goals, and what intelligence features will drive the most value." },
              { step: "02", title: "Design", desc: "We create stunning designs with UX optimised for engagement and conversion." },
              { step: "03", title: "Build", desc: "We develop your site with AI, AR, and smart features seamlessly integrated." },
              { step: "04", title: "Launch & Support", desc: "We deploy, train your team, and provide ongoing support and optimisation." }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-blue-500 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
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
