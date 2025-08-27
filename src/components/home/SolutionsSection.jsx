
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareText, Zap, Brain, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AudioPlayer from '../common/AudioPlayer';

export default function SolutionsSection() {
  const solutions = [
    {
      icon: MessageSquareText,
      title: "AI Voice Agent",
      description: "Scale up customer service with intelligent AI voice agents that handle support calls, appointment booking, and customer inquiries with natural, human-like responses 24/7.",
      features: [
        "Natural, flowing conversation powered by advanced LLMs",
        "24/7 customer interaction",
        "Book meetings, send documents, and process forms",
        "CRM integration",
        "Improve customer satisfaction and reduce support costs"
      ],
      hasAudio: true,
      audioUrl: "https://storage.vapi.ai/6f691d1c-62e3-4ed2-a38f-a10e728608c2-1754876493577-bfc84970-e814-4824-9889-3630eba7fab6-mono.wav",
      audioTitle: "Demo"
    },
    {
      icon: Zap,
      title: "AI Sales Agent", // Changed from "AI Sales Assistant" to "AI Sales Agent"
      description: "Scale up sales performance with AI sales agents that automate lead qualification, provide real-time conversation insights, and boost deal closure rates.",
      features: ["Real-time suggestions", "AI script generation", "Follow-up automation", "CRM syncing"],
      hasAudio: true,
      audioUrl: "https://storage.vapi.ai/77f36ca3-03eb-4f12-aadd-2b532cc86313-1754877123959-edbd6523-9e7a-45b5-ad7f-4de0d2af5031-mono.wav",
      audioTitle: "Demo"
    },
    {
      icon: Brain,
      title: "Custom LLM Pipelines",
      description: "Scale up operations with custom large language model pipelines for document processing, content creation, and knowledge management. End-to-end AI automation that saves time and boosts productivity.",
      features: [
        "Automate repetitive tasks and save hours every week",
        "Connect apps like Gmail, Slack, Notion, CRMs, and more",
        "Custom automations for lead generation, follow-ups, and support",
        "Full setup, testing, and support handled for you"
      ],
    },
    {
      icon: Eye,
      title: "Computer Vision Tools",
      description: "Scale up visual operations with advanced computer vision tools for quality control, inventory management, object detection, and automated inspection systems.",
      features: [
        "Detect and analyse objects, faces and text in images or video",
        "Automate visual tasks like quality checks, inventory tracking, and ID scanning",
        "Real-time image/video processing with high accuracy",
        "End-to-end setup, deployment, and support provided"
      ],
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Scale Up with AI Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Scale up your business with our AI agents, custom LLM pipelines, voice automation, and computer vision tools designed to boost productivity and drive growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full border-gray-700 bg-gray-800 shadow-lg transition-all duration-300 group overflow-hidden w-full">
                <CardContent className="p-4 sm:p-6 lg:p-8 w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <solution.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1 gap-y-2 sm:gap-y-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {solution.title}
                      </h3>
                      {solution.hasAudio && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm text-gray-400">Demo</span>
                          <AudioPlayer 
                            audioUrl={solution.audioUrl}
                            title={solution.audioTitle}
                            isCompact={true}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                    {solution.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-200 mb-3 text-sm sm:text-base">Key Features:</h4>
                    <div className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
