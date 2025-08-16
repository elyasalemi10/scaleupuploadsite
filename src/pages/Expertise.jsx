
import React from 'react';
import { Button } from "@/components/ui/button"; // Button component is no longer used for the specific CTA
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, BookOpen, Settings, Brain, Eye, Bot, Database, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const consultingServices = [
    { icon: Brain, title: "Machine Learning" },
    { icon: Eye, title: "Computer Vision" },
    { icon: Bot, "title": "Robotic Process Automation (RPA)" },
    { icon: Database, title: "Data Science & Forecasting" },
];

const expertiseAreas = [
  {
    icon: Brain,
    title: "Mohammad",
    subtitle: "AI Systems Engineer",
    description: "With a PhD in Computer Systems Engineering (UniSA) and over 10 years in AI, optimisation, and automation, Mohammad has built everything from AI-driven mining logistics systems to award-winning robotics. His expertise spans Java, Python, ML, AR, and enterprise automation.",
    services: [
        "Machine Learning: Predictive analytics, customer segmentation, and recommendation systems",
        "RPA: Automate workflows and reduce human error with intelligent task bots",
        "Data Science: From data wrangling to forecasting",
        "AI Strategy & Roadmapping",
    ],
    ctas: [{ text: "Book a consultation", primary: true }],
    image: "/mohamad.png"
  },
  {
    icon: Shield,
    title: "Abdullah",
    subtitle: "AI Strategy & Ethics",
    description: "With a Master's in Assessment and Evaluation, Abdullah guides businesses on AI adoption, organisational design, and market entry — while ensuring social responsibility and ethical alignment.",
    services: [
        "Guides businesses through AI adoption with minimal risk",
        "Designs organisations for agility and future-readiness",
        "Supports ethical and socially responsible AI strategies",
        "Helps shape market entry plans with AI-driven insights",
    ],
    ctas: [{ text: "Book a consultation", primary: true }],
    image: "/abdullah.png"
  },
  {
    icon: BookOpen,
    title: "Baqir",
    subtitle: "Business Development & AI Integration",
    description: "Property development leader turned AI strategist, Baqir has delivered projects exceeding $100M. He bridges traditional industries and AI innovation to deliver operational efficiency, data-led growth, and competitive resilience.",
    services: [
        "Delivers AI projects that maximise operational efficiency",
        "Bridges traditional industries with cutting-edge AI",
        "Unlocks data-driven growth strategies",
        "Strengthens competitive resilience through innovation",
    ],
    ctas: [{ text: "Book a consultation", primary: true }],
    image: "/baqir.png"
  },
  {
    icon: Settings,
    title: "Santhakumar",
    subtitle: "Gen AI & LLM Expert",
    description: "PhD researcher with hands-on experience in Agentic AI, NLP, Computer Vision, and real-time AI systems. Former Intel and Bosch engineer, skilled in edge computing, IoT, and scalable AI solutions.",
    services: [
        "AI/computer vision",
        "Natural Language Processing",
        "Create Advanced apps using NLP and computer vision",
        "Skilled in edge computing",
    ],
    ctas: [{ text: "Book a consultation", primary: true }],
    image: "/santhakumar.png"
  },
  {
    icon: Award,
    title: "Elyas",
    subtitle: "AI Agent Developer",
    description: "Specialist in building Agentic AI to help businesses raise the bar in productivity. Elyas has created multiple AI systems that save 30–40% of time on repetitive tasks and boost communication efficiency across industries.",
    services: [
        "Custom AI Automations",
        "Conversational AI",
        "Mobile and web applications",
        "Web development",
    ],
    ctas: [{ text: "Book a consultation", primary: true }],
    image: "/elyas.png"
  }
];

export default function Expertise() {
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
                Expertise
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Partner with our expert consultants to navigate the complexities of AI. We provide strategic guidance, custom development, team training, and long-term management to ensure your success.
            </motion.p>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex ${index === 4 ? 'md:col-span-2 justify-center' : ''}`}
              >
                <div className={index === 4 ? 'w-full md:w-1/2' : 'w-full'}>
                  <Card className="h-full w-full border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <CardContent className="p-8 flex flex-col flex-grow">
                      {/* 1. Profile Section with circular image and title */}
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500/30 flex-shrink-0">
                          <img 
                            src={area.image}
                            alt={`${area.title}'s AI Avatar`}
                            title={`${area.title}'s AI Avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
                          <p className="text-blue-600 text-sm font-medium">{area.subtitle}</p>
                        </div>
                      </div>

                      {/* 2. Description - with a minimum height for alignment */}
                      <div className="min-h-[140px]">
                        <p className="text-gray-600 leading-relaxed">{area.description}</p>
                      </div>

                      {/* 3. Services list - with top margin for spacing */}
                      <div className="space-y-2 mt-6">
                        {area.services.map(service => (
                          <div key={service} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{service}</span>
                          </div>
                        ))}
                      </div>

                      {/* 4. Button - pushed to the bottom and centered */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-auto justify-center">
                        {area.ctas.map(cta => (
                          <Link to={createPageUrl('Contact')} key={cta.text}>
                            <button className="gold-button shine-button text-lg">
                              <span className="text">{cta.text}</span>
                            </button>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
