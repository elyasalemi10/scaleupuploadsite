
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IndustriesSection() {
  const industries = [
    {
      title: "Healthcare & Medical",
      description: "Patient data processing, diagnostic assistance, and medical image analysis",
      testimonial: "Reduced diagnosis time by 40% with our custom computer vision solution",
      author: "Dr. Sarah Chen, Radiology Dept."
    },
    {
      title: "Manufacturing & Quality Control",
      description: "Automated inspection, predictive maintenance, and production optimisation",
      testimonial: "AI-powered quality control caught 99.2% of defects, saving $2M annually",
      author: "Mike Rodriguez, Operations Manager"
    },
    {
      title: "Financial Services",
      description: "Fraud detection, risk assessment, and automated document processing",
      testimonial: "Our fraud detection accuracy improved from 85% to 97% in just 3 months",
      author: "Jennifer Liu, Risk Management"
    },
    {
      title: "Retail & E-commerce",
      description: "Customer service automation, inventory management, and personalization",
      testimonial: "Voice AI handles 70% of customer inquiries, customers love the instant response",
      author: "Alex Thompson, Customer Success"
    },
    {
      title: "Legal & Professional Services",
      description: "Document analysis, contract review, and research automation",
      testimonial: "Contract review time reduced from 8 hours to 45 minutes with 95% accuracy",
      author: "Rachel Martinez, Senior Partner"
    },
    {
      title: "Real Estate & Property",
      description: "Property valuation, market analysis, and virtual assistance",
      testimonial: "AI assistant qualifies leads 24/7, increased conversions by 35%",
      author: "David Kim, Real Estate Broker"
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
              Industries & Use Cases
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-world AI implementations across diverse industries, delivering measurable results and competitive advantages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-700 bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  <div className="bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 italic mb-2 leading-relaxed">
                      "{industry.testimonial}"
                    </blockquote>
                    <cite className="text-sm text-gray-300 font-medium">
                      — {industry.author}
                    </cite>
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
