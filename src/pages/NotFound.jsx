import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../components/home/Navigation';
import ContactSection from '../components/home/ContactSection';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Navigation />
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* 404 Title */}
            <div className="space-y-4">
              <h1 className="text-8xl font-bold text-gray-900">404</h1>
              <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
              </p>
            </div>
            
            {/* Take Me Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Home className="w-5 h-5" />
                <span>Take Me Home</span>
              </Link>
            </motion.div>
            
            {/* Additional Help */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/ai-voice-agent"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  AI Voice Agent
                </Link>
                <Link
                  to="/computer-vision-tools"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  Computer Vision Tools
                </Link>
                <Link
                  to="/ai-sales-assistant"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  AI Sales Assistant
                </Link>
                <Link
                  to="/custom-llm"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  Custom LLM
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <div className="bg-gray-900">
        <ContactSection />
      </div>
    </div>
  );
};

export default NotFound;
