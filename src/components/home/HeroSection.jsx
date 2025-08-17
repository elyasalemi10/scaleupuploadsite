import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900 overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/new.gif"
          alt="AI Background Animation"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/50 rounded-full text-blue-300 text-sm font-medium border border-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>

              <Sparkles className="w-4 h-4" />
              From Strategy to Agents — Scale Up with AI
            </motion.div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  We help businesses choose the right AI tools
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  and build the best solution for their needs.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Expert AI advice backed by solid skills in LLMs, machine learning, computer vision, and prompt engineering. We build custom AI that get real results.
              </p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}>

              <button
                id="consult-btn"
                data-cal-link="scaleupai/15min"
                data-cal-namespace="15min"
                data-cal-config='{"layout":"month_view"}'
                className="gold-button shine-button flex items-center justify-center gap-2 text-lg"
              >
                <span className="text">Free 15m Consult</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              className="hidden md:flex items-center gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}>

              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-gray-300">Fast Implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Custom Solutions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Optional: Keep some content on the right side for desktop, or leave empty for full background effect */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            {/* This space can be used for additional content or left empty for full background video effect */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}