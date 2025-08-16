import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function PageLoader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const barVariants = {
    initial: { height: 0 },
    animate: (i) => ({
      height: [0, Math.random() * 60 + 20, Math.random() * 60 + 20, Math.random() * 60 + 20, 0],
      transition: {
        duration: 1.2,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            variants={overlayVariants}
            initial="initial"
            exit="exit"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo with Arrow */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center gap-3"
              >
                <TrendingUp className="w-8 h-8 text-white" />
                <div className="flex items-end gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 bg-white rounded-t-sm"
                      variants={barVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}