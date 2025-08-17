import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/api/entities';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!solutionPaths.includes(location.pathname)) {
        setIsMobileSolutionsOpen(false);
    }
  }, [location.pathname]);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle clicking outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsMobileSolutionsOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const solutionLinks = [
    { title: 'All Services', path: createPageUrl('Services') },
    { title: 'AI Voice Agent', path: createPageUrl('AIVoiceAgent') },
    { title: 'AI Sales Agent', path: createPageUrl('AISalesAssistant') },
    { title: 'Custom LLM Pipelines', path: createPageUrl('CustomLLM') },
    { title: 'Staff Training Program', path: createPageUrl('StaffTrainingProgram') },
    { title: 'Computer Vision Tools', path: createPageUrl('ComputerVisionTools') }
  ];
  const solutionPaths = solutionLinks.map(link => link.path);
  const isSolutionsActive = solutionPaths.includes(location.pathname);

  const navItems = [
    { title: 'Home', path: createPageUrl('Home') },
    { title: 'Expertise', path: createPageUrl('Expertise') },
    { title: 'Contact', path: createPageUrl('Contact') },
  ];

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleMobileSolutions = () => {
    setIsMobileSolutionsOpen(prev => !prev);
  };

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      ref={mobileMenuRef}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <img 
              src="/navbar_logo.png"
              alt="Scale Up AI Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 1).map(item => (
              <Link 
                key={item.title}
                to={item.path}
                className={`transition-colors font-medium ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                {item.title}
              </Link>
            ))}

            {/* Solutions Dropdown */}
            <div 
                className="relative" 
                onMouseEnter={() => setIsSolutionsDropdownOpen(true)}
                onMouseLeave={() => setIsSolutionsDropdownOpen(false)}
            >
                <Link
                  to={createPageUrl('Services')}
                  className={`transition-colors font-medium flex items-center gap-1 ${
                    isSolutionsActive ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
                <AnimatePresence>
                {isSolutionsDropdownOpen && (
                    <motion.div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-2">
                            {solutionLinks.map(link => (
                                <Link 
                                    key={link.title}
                                    to={link.path}
                                    onClick={() => setIsSolutionsDropdownOpen(false)} // Close dropdown on click
                                    className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                                        location.pathname === link.path 
                                        ? 'bg-blue-900/50 text-blue-300' 
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            {navItems.slice(1).map(item => (
              <Link 
                key={item.title}
                to={item.path}
                className={`transition-colors font-medium ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <button className="gold-button shine-button">
                <span className="text">Get in Touch</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={toggleMobileMenu}
            type="button"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 space-y-2">
                <Link
                    to={createPageUrl('Home')}
                    onClick={closeMenu}
                    className={`block w-full text-left py-3 font-medium text-lg rounded-md px-4 ${
                      location.pathname === createPageUrl('Home') ? 'bg-blue-900/50 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    Home
                </Link>
                
                {/* Mobile Solutions Submenu */}
                <div>
                  <button
                    onClick={toggleMobileSolutions}
                    type="button"
                    className={`flex justify-between items-center w-full text-left py-3 font-medium text-lg rounded-md px-4 ${
                      isSolutionsActive ? 'bg-blue-900/50 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    Services
                    <ChevronDown className={`w-5 h-5 transition-transform ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                  {isMobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-1 space-y-1"
                    >
                      {solutionLinks.map(link => (
                        <Link
                          key={link.title}
                          to={link.path}
                          onClick={closeMenu}
                          className={`block w-full text-left py-2 font-medium text-base rounded-md px-4 ${
                            location.pathname === link.path ? 'bg-blue-900/50 text-blue-300' : 'text-gray-400 hover:bg-gray-800'
                          }`}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>

                {navItems.slice(1).map(item => (
                  <Link
                    key={item.title}
                    to={item.path}
                    onClick={closeMenu}
                    className={`block w-full text-left py-3 font-medium text-lg rounded-md px-4 ${
                      location.pathname === item.path ? 'bg-blue-900/50 text-blue-400' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-6 space-y-3">
                  <Link to={createPageUrl('Contact')} onClick={closeMenu}>
                    <button className="gold-button shine-button w-full flex items-center justify-center gap-2">
                      <span className="text">Get in Touch</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}