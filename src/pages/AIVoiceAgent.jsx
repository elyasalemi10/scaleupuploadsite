
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquareText, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactSection from '../components/home/ContactSection';
import AudioPlayer from '../components/common/AudioPlayer';
import { Input } from "@/components/ui/input";

export default function AIVoiceAgent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Natural, flowing conversation powered by advanced LLMs",
    "24/7 customer interaction",
    "Book meetings, send documents, and process forms",
    "CRM integration",
    "Improve customer satisfaction and reduce support costs",
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, ''); // Only allow letters
    if (value.length <= 10) {
      setName(value);
      setError('');
    }
  };

  const validatePhone = (phone) => {
    return phone.startsWith('04') && phone.length === 10;
  };

  const validateName = (name) => {
    return name.length > 0 && /^[a-zA-Z]+$/.test(name);
  };

  const handleCallRequest = async () => {
    if (isSubmitted) return;
    
    if (!name) {
      setError('Please enter your name');
      return;
    }

    if (!validateName(name)) {
      setError('Please enter a valid name (letters only)');
      return;
    }

    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError('Add a valid Australian phone number starting with 04');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://elyasalemi.app.n8n.cloud/webhook/336ae9ff-dfe4-4467-8f85-d79cd5dd637c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          name: name,
          page: 'AIVoiceAgent'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setPhoneNumber('');
        setName('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
                <MessageSquareText className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Voice Agent
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Intelligent, conversational AI agents that handle customer support, sales inquiries, and booking requests—all with human-like understanding and tone.
            </p>
            
            <div className="flex justify-center items-center gap-4 mt-8">
              <span className="text-gray-400">Listen to Demo:</span>
              <AudioPlayer 
                audioUrl="https://storage.vapi.ai/6f691d1c-62e3-4ed2-a38f-a10e728608c2-1754876493577-bfc84970-e814-4824-9889-3630eba7fab6-mono.wav"
                title="AI Voice Agent Demo"
                isCompact={true}
              />
            </div>
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
                  <span className="text">Book a Demo</span>
                </button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <img 
                src="/voice_agent_light.png"
                alt="AI Voice Agent"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Call Demo Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Free Call Demo</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Experience our AI Voice Agent firsthand with a live demo call. See how natural conversations flow and how customer inquiries are handled with human-like intelligence.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Try real conversation scenarios</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Experience natural language processing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">No commitment required</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">See how AI responds to scenarios relevant to you</span>
                </div>
              </div>
              
              <div className="pt-6">
                <p className="text-sm text-gray-400 mb-4 hidden lg:block">
                  Enter your details below and our AI agent will call you within 30 seconds for a personalized demo.
                </p>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center flex-col">
              <div className="relative mb-6">
                <img 
                  src="/phone.png"
                  alt="AI Voice Agent Call Demo"
                  className="w-auto h-auto max-w-sm mx-auto relative z-10"
                />
                
                {/* Phone field positioned in the middle */}
                <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-48 relative">
                    <Input
                      type="tel"
                      placeholder={!isFocused ? "Phone number" : ""}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(phoneNumber.length > 0)}
                      autoComplete="new-password"
                      className="bg-transparent border-none text-white text-center text-lg font-bold placeholder:text-gray-400 placeholder:text-lg focus:ring-0 focus:border-none focus:outline-none h-10 shadow-none focus:shadow-none hover:border-none active:border-none"
                      style={{ border: 'none', boxShadow: 'none' }}
                      disabled={isSubmitted}
                    />
                  </div>
                </div>

                {/* Name field positioned below phone field */}
                <div className="absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-48 relative">
                    <Input
                      type="text"
                      placeholder={!isNameFocused ? "Name" : ""}
                      value={name}
                      onChange={handleNameChange}
                      onFocus={() => setIsNameFocused(true)}
                      onBlur={() => setIsNameFocused(name.length > 0)}
                      autoComplete="new-password"
                      className="bg-transparent border-none text-white text-center text-lg font-bold placeholder:text-gray-400 placeholder:text-lg focus:ring-0 focus:border-none focus:outline-none h-8 shadow-none focus:shadow-none hover:border-none active:border-none"
                      style={{ border: 'none', boxShadow: 'none' }}
                      disabled={isSubmitted}
                    />
                  </div>
                </div>
                
                {/* Call button positioned at bottom of phone */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                  {isSubmitted ? (
                    <div className="text-green-400 text-sm text-center">
                      Demo call requested! You should receive a call shortly.
                    </div>
                  ) : (
                    <button
                      onClick={handleCallRequest}
                      disabled={isLoading}
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              {error && (
                <div className="mt-2 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
               <p className="lg:hidden text-sm text-gray-400 mt-4 text-center px-4">
                  Enter your details below and our AI agent will call you within 30 seconds for a personalized demo.
                </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="contact" className="bg-gray-900">
        <ContactSection />
      </div>
    </div>
  );
}
