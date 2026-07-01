import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/navbar_logo_optimized.webp"
                alt="Scale Up AI Logo"
                className="h-8 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              From Strategy to Agents, Scale Up with AI. Expert consulting for businesses ready to harness the power of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>03 9001 7788</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@scaleupwithai.ai</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={createPageUrl('Expertise')} className="hover:text-blue-400 transition-colors">
                  AI Consulting
                </Link>
              </li>
              <li>
                <Link href={createPageUrl('AIVoiceAgent')} className="hover:text-blue-400 transition-colors">
                  AI Voice Agent
                </Link>
              </li>
              <li>
                <Link href={createPageUrl('AISalesAssistant')} className="hover:text-blue-400 transition-colors">
                  AI Sales Agent
                </Link>
              </li>
              <li>
                <Link href={createPageUrl('AIAssistant')} className="hover:text-blue-400 transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Expertise</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Large Language Models</li>
              <li>Machine Learning</li>
              <li>Computer Vision</li>
              <li>Prompt Engineering</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ScaleupwithAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 md:mt-0">
            <MapPin className="w-4 h-4" />
            <span>Level 19, 263 William St, Melbourne 3000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
