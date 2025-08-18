import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!section || !background || !overlay || !content) return;

    // Ensure video is properly configured
    if (background.tagName === 'VIDEO') {
      background.muted = true;
      background.playsInline = true;
      background.preload = 'auto';
      background.pause();
      background.currentTime = 0;
      
      // Prevent any autoplay
      background.addEventListener('loadstart', () => {
        background.pause();
        background.currentTime = 0;
      });
    }

    // Create scroll-triggered animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Even smoother scrubbing effect
        onUpdate: (self) => {
          // Update background animation based on scroll progress
          const progress = self.progress;
          
          // Control video playback based on scroll progress
          if (background.tagName === 'VIDEO') {
            const videoDuration = background.duration || 0;
            if (videoDuration > 0 && !isNaN(videoDuration)) {
              // Set video time based on scroll progress (0 to duration)
              const targetTime = progress * videoDuration;
              // Only update if there's a meaningful difference to avoid stuttering
              if (Math.abs(background.currentTime - targetTime) > 0.1) {
                background.currentTime = targetTime;
              }
            }
          }
          
          // Animate background scale and position
          gsap.set(background, {
            scale: 1 + progress * 0.1, // Reduced zoom effect
            y: -progress * 50, // Reduced parallax effect
          });
          
          // Animate overlay opacity for dynamic lighting
          gsap.set(overlay, {
            opacity: 0.6 - progress * 0.2, // Lighten as user scrolls
          });
          
          // Animate content with parallax
          gsap.set(content, {
            y: -progress * 30, // Reduced parallax for text
          });
        }
      }
    });

    // Initial animation on page load
    gsap.fromTo(background, 
      { 
        scale: 1.1, 
        opacity: 0 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.5, 
        ease: "power2.out",
        onComplete: () => {
          // Ensure video is paused and at start
          if (background.tagName === 'VIDEO') {
            background.pause();
            background.currentTime = 0;
          }
        }
      }
    );

    // Animate content on load
    gsap.fromTo(content, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        delay: 0.3, 
        ease: "power2.out" 
      }
    );

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-900 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={backgroundRef}
          src="/new.webm"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onLoadedData={() => {
            // Pause video initially and set to first frame
            if (backgroundRef.current) {
              backgroundRef.current.pause();
              backgroundRef.current.currentTime = 0;
            }
          }}
        />
        {/* Dark overlay for better text readability */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/60"></div>
      </div>

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-6 z-10">
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