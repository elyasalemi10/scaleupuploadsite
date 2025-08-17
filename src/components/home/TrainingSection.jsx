
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrainingSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const programs = [
    {
      icon: Users,
      title: "Executive AI Strategy",
      description: "Leadership workshops on AI implementation strategy, ROI planning, and digital transformation roadmaps.",
      duration: "Half-day intensive",
      audience: "C-suite, Directors"
    },
    {
      icon: BookOpen,
      title: "Prompt Engineering Masterclass",
      description: "Hands-on training to maximise AI tool effectiveness, reduce hallucinations, and create reliable AI workflows.",
      duration: "2-day workshop",
      audience: "All staff levels"
    },
    {
      icon: Target,
      title: "AI Tool Implementation",
      description: "Practical training on using AI tools in daily workflows, from basic automation to advanced integrations.",
      duration: "1-day workshop",
      audience: "End users, Teams"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Training & Workshops
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empower your team with the knowledge and skills to leverage AI effectively. From strategy to hands-on implementation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {program.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Duration:</span>
                      <span className="text-sm text-white">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Audience:</span>
                      <span className="text-sm text-white">{program.audience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg text-center border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6 text-white">
            Ready to Upskill Your Team?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Custom training programs designed for your organization's specific needs and AI implementation goals.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Schedule Training Consultation
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
