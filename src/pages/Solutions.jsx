
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles, MessageSquareText, Zap, Brain, BookOpen, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ContactSection from '../components/home/ContactSection';
import AudioPlayer from '../components/common/AudioPlayer';

const solutions = [
  {
    id: 'ai-voice-agent',
    icon: MessageSquareText,
    title: "AI Voice Agent",
    description: "Intelligent, conversational AI agents that handle customer support, sales inquiries, and booking requests—all with human-like understanding and tone.",
    features: [
      "Natural, flowing conversation powered by advanced LLMs",
      "24/7 customer interaction",
      "Book meetings, send documents, and process forms",
      "CRM integration",
      "Improve customer satisfaction and reduce support costs",
    ],
    ctas: [{ text: "Book a Demo", primary: true }],
    hasAudio: true,
    audioTitle: "Demo",
    audioUrl: "https://storage.vapi.ai/8d7b7598-550b-42b5-a928-ef8be55efd0f-1753489874430-b75ef17b-1335-4fe1-833e-6899b9af9925-mono.wav", // Added specific audio URL for voice agent
    image: "/voice_agent_light.png",
    pageUrl: createPageUrl('AIVoiceAgent')
  },
  {
    id: 'ai-sales-agent',
    icon: Zap,
    title: "AI Sales Agent",
    description: "An always-on sales sidekick that helps teams close more deals by automating tasks, analysing conversations in real time, and offering sales insights as they happen. It helps track and prioritise leads, personalise outreach, and deliver data-backed scripts to maximise performance.",
    features: [
      "Real-time suggestions during calls or chats",
      "Sales script generation using AI",
      "Calendar and follow-up automation",
      "Hot lead detection & smart reminders",
      "Seamless CRM and platform syncing",
    ],
    ctas: [{ text: "Boost Your Sales with AI", primary: true }],
    hasAudio: true,
    audioTitle: "Demo",
    audioUrl: "https://storage.vapi.ai/77f36ca3-03eb-4f12-aadd-2b532cc86313-1754877123959-edbd6523-9e7a-45b5-ad7f-4de0d2af5031-mono.wav", // Updated specific audio URL for sales agent
    image: "/sales_agent_dark.png",
    pageUrl: createPageUrl('AISalesAssistant')
  },
  {
    id: 'custom-llm',
    icon: Brain,
    title: "Custom LLM Pipelines",
    description: "Custom large language model setups built for document processing, content creation, and knowledge management — plus end-to-end automations that streamline workflows, save time, and boost productivity across your business.",
    features: [
      "Automate repetitive tasks and save hours every week",
      "Connect apps like Gmail, Slack, Notion, CRMs, and more",
      "Custom automations for lead generation, follow-ups, and support",
      "Full setup, testing, and support handled for you"
    ],
    ctas: [{ text: "Discuss Your LLM Needs", primary: true }],
    image: "/llm_pipelines_light.png",
    pageUrl: createPageUrl('CustomLLM')
  },
  {
    id: 'staff-training-program',
    icon: BookOpen,
    title: "Staff Training Program",
    description: "Empower your team with the skills to leverage AI effectively. We offer custom training programs from executive briefings to hands-on workshops.",
    features: [
      "Prompt Engineering for Business Users",
      "Navigating LLMs Safely",
      "Custom Tool Training (based on your AI stack)",
      "Executive AI Strategy Sessions",
    ],
    ctas: [{ text: "Explore Training Options", primary: true }],
    image: "/staff_training_program_dark.png", 
    pageUrl: createPageUrl('StaffTrainingProgram')
  },
  {
    id: 'computer-vision-tools',
    icon: Eye,
    title: "Computer Vision Tools",
    description: "Advanced image and video processing solutions for quality control, inventory management, and automated inspection.",
    features: [
      "Detect and analyse objects, faces and text in images or video",
      "Automate visual tasks like quality checks, inventory tracking, and ID scanning",
      "Real-time image/video processing with high accuracy",
      "End-to-end setup, deployment, and support provided"
    ],
    ctas: [{ text: "Explore Computer Vision", primary: true }],
    image: "/computer_vision_tools_light.png",
    pageUrl: createPageUrl('ComputerVisionTools')
  },
];

export default function Solutions() {
  useEffect(() => {
    // Handle scrolling to specific solution on page load
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
                Solutions
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover our suite of ready-to-deploy AI products and custom-built solutions designed to drive efficiency, boost sales, and enhance customer satisfaction.
            </motion.p>
        </div>
      </section>

      {/* Solutions Details */}
      <div className="bg-white">
        {solutions.map((solution, index) => (
            <section
                key={solution.id}
                id={solution.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-900'} py-24`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div 
                        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <solution.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                                    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${index % 2 === 0 ? 'from-gray-900 to-gray-700' : 'from-white to-gray-300'}`}>{solution.title}</h2>
                                    {solution.hasAudio && (
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={`text-sm ${index % 2 === 0 ? 'text-gray-500' : 'text-gray-400'}`}>{solution.audioTitle}</span>
                                        {/* Use solution.audioUrl which is now defined for solutions with audio */}
                                        <AudioPlayer 
                                            audioUrl={solution.audioUrl}
                                            title={solution.audioTitle}
                                            isCompact={true}
                                        />
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            <p className={`text-base lg:text-lg leading-relaxed ${index % 2 === 0 ? 'text-gray-600' : 'text-gray-300'}`}>{solution.description}</p>
                            
                            <div className="space-y-3 pt-4">
                                {solution.features.map(feature => (
                                <div key={feature} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <span className={`text-sm lg:text-base ${index % 2 === 0 ? 'text-gray-600' : 'text-gray-300'}`}>{feature}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className={`relative hidden lg:block ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                            {solution.image ? (
                                <img 
                                    src={solution.image}
                                    alt={solution.title}
                                    className="w-full h-auto rounded-2xl"
                                />
                            ) : (
                                <div className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-3xl p-8 shadow-lg aspect-[4/3] flex items-center justify-center border border-blue-200">
                                <solution.icon className="w-32 h-32 text-blue-400 opacity-50" />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="flex justify-center pt-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                        {solution.ctas.map(cta => (
                            <Link key={cta.text} to={solution.pageUrl}>
                                <button className="gold-button shine-button text-lg">
                                    <span className="text">{cta.text}</span>
                                </button>
                            </Link>
                        ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        ))}
      </div>

      <section className="bg-gray-900">
        <ContactSection />
      </section>
    </div>
  );
}
