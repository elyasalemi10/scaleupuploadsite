

import React, { useEffect, useState } from 'react';
import Navigation from '../components/home/Navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Layout({ children, currentPageName }) {

  const scrollToSolution = (solutionId) => {
    // Navigate to solutions page first, then scroll
    window.location.href = `${createPageUrl('Services')}#${solutionId}`;
  };

  useEffect(() => {
    // Add Cal.com embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "15min", {origin:"https://app.cal.com"});
      Cal.ns["15min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    
    // Add script before closing body tag
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f6fa] text-gray-800 font-sans">
      <style>{`
        .gold-button {
          color: #000000;
          background-image: linear-gradient(180deg, #f6e27a 20%, #cb9b51 80%);
          font-weight: bold;
          padding: 16px 32px;
          border-radius: 8px;
          margin: 5px;
          border-width: 0;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 12px 0 #ffcd57;
          transition: all 0.5s ease;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 44px;
          min-width: 44px;
        }

        .shine-button {
          position: relative;
          overflow: hidden;
        }

        .shine-button:after {
          content:'';
          top:0;
          transform:translateX(100%);
          width:100%;
          height:220px;
          position: absolute;
          z-index:1;
          animation: slide 2s infinite;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%);
        }

        @keyframes slide {
          0% {transform:translateX(-100%);}
          100% {transform:translateX(100%);}
        }

        .shine-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .shine-button:disabled:after {
          animation: none;
        }
      `}</style>
      <Navigation />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <picture>
                    <source media="(max-width: 768px)" srcSet="/navbar_logo_mobile.png" />
                    <img 
                      src="/navbar_logo_optimized.png"
                      alt="Scale Up AI Logo"
                      className="h-8 w-auto object-contain"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  From Strategy to Agents — Scale Up with AI. Expert consulting for businesses ready to harness the power of artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>(03) 84004145</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>iscaleupwithai@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to={createPageUrl('Expertise')} className="hover:text-blue-400 transition-colors">
                      AI Consulting
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSolution('ai-voice-agent')}
                      className="hover:text-blue-400 transition-colors text-left"
                    >
                      AI Voice Agent
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSolution('ai-sales-agent')}
                      className="hover:text-blue-400 transition-colors text-left"
                    >
                      AI Sales Agent
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSolution('custom-llm')}
                      className="hover:text-blue-400 transition-colors text-left"
                    >
                      Custom AI Solutions
                    </button>
                  </li>
                  <li>
                    <Link to={createPageUrl('Expertise')} className="hover:text-blue-400 transition-colors">
                      Staff Training
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
    </div>
  );
}

