
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Button component is imported but will be replaced by native button for the submit action.
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendContactEmail } from "@/api/resend";
import { ContactSubmission } from "@/api/entities";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || hasSubmittedSuccessfully) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Save to database
      await ContactSubmission.create(formData);
      
      // Send email via Resend
      try {
        await sendContactEmail(formData);
        console.log('Email sent successfully via Resend');
      } catch (emailError) {
        console.error('Email sending failed, trying fallback method:', emailError);
        
        // Fallback: Open default email client
        const mailtoLink = `mailto:iscaleupwithai@gmail.com?subject=${encodeURIComponent(`[Scale Up AI] Contact from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\n\nMessage:\n${formData.message}`)}`;
        window.open(mailtoLink, '_blank');
        console.log('Opened fallback email client');
      }
      
      setIsSubmitted(true);
      setHasSubmittedSuccessfully(true);
      // Don't reset the form or hide the success message - require page refresh
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-white">
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
              Let's Talk AI — Book Your Strategy Session
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with AI? Let's discuss your challenges and explore how our solutions can drive real results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Get in Touch
                </h3>
                
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <CheckCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <div className="absolute inset-0 w-16 h-16 mx-auto animate-pulse">
                        <CheckCircle className="w-16 h-16 text-yellow-400" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for your message. We'll get back to you shortly.</p>
                    <p className="text-sm text-gray-500 mt-2">Refresh the page to send another message.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5"/>
                        <span>{error}</span>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">Tell us about your AI challenges *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your business challenges, current AI usage, or specific goals..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-button shine-button w-full flex items-center justify-center gap-2 text-lg"
                    >
                      <span className="text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info and "Why get in touch" - Hidden on mobile */}
          <motion.div
            className="space-y-8 hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-gray-200 bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">(03) 84004145</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">iscaleupwithai@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">Level 19, 263 William St<br />Melbourne 3000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Why Get in Touch?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">Identify AI opportunities specific to your business</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">Get expert recommendations on tools and strategies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">Understand implementation timeline and costs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">No obligation, just valuable insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
