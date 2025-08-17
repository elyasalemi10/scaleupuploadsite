
import React from 'react';
import { Target, Settings, TrendingUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProcessSection() {
  const steps = [
    {
      icon: Target,
      title: "Discover",
      description: "Understand your business and your challenge",
      details: "We dive deep into your operations, spot the problems, and find where AI can make the most difference."
    },
    {
      icon: Settings,
      title: "Build & Integrate",
      description: "Select and implement the most effective AI solution",
      details: "Custom development and seamless integration of AI tools that fit your existing operations and deliver measurable results."
    },
    {
      icon: TrendingUp,
      title: "Refine & Scale",
      description: "Continuous improvement, support, and team training",
      details: "Ongoing optimisation, staff training, and scaling strategies to ensure your AI investment continues to deliver value."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven three-step process ensures successful AI implementation that delivers real business value.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-400/30 to-blue-500/20 transform -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 relative z-10 border border-gray-200 h-full">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="w-8 h-8 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                    {step.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4 text-center">
                    {step.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.details}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <ArrowDown className="w-6 h-6 text-blue-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
