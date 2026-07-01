'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPageUrl } from '@/utils';

const allServices = { title: 'All Services', path: createPageUrl('Services') };

const services = [
  { title: 'AI Voice Agent', desc: 'Human-like phone agents', path: createPageUrl('AIVoiceAgent') },
  { title: 'AI Sales Agent', desc: 'Close deals around the clock', path: createPageUrl('AISalesAssistant') },
  { title: 'Custom LLM Pipelines', desc: 'Models tuned to your data', path: createPageUrl('CustomLLM') },
  { title: 'AI Assistant', desc: 'Your always-on copilot', path: createPageUrl('AIAssistant') },
  { title: 'Intelligent Websites', desc: 'Sites that think and convert', path: '/intelligent-websites' },
  { title: 'Staff Training Program', desc: 'Upskill your whole team', path: createPageUrl('StaffTrainingProgram') },
];

const solutionPaths = [allServices.path, ...services.map((s) => s.path)];

const navItems = [
  { title: 'Home', path: createPageUrl('Home') },
  { title: 'Expertise', path: createPageUrl('Expertise') },
  { title: 'Contact', path: createPageUrl('Contact') },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center py-1.5 text-sm font-medium tracking-tight transition-colors"
    >
      <span className={active ? 'text-white' : 'text-gray-300 group-hover:text-white'}>{label}</span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-blue-500 transition-transform duration-300 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();
  const isSolutionsActive = solutionPaths.includes(pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!solutionPaths.includes(pathname)) {
      setIsMobileSolutionsOpen(false);
    }
  }, [pathname]);

  // Solid header after scrolling past the top
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'border-b border-white/10 bg-gray-900/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href={createPageUrl('Home')} className="flex items-center">
          <img
            src="/navbar_logo_optimized.webp"
            alt="Scale Up AI"
            className="h-9 w-auto object-contain"
            loading="eager"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 lg:flex">
          <NavLink href={navItems[0].path} label={navItems[0].title} active={pathname === navItems[0].path} />

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <Link
              href={allServices.path}
              className="group relative inline-flex items-center gap-1 py-1.5 text-sm font-medium tracking-tight transition-colors"
              aria-expanded={isSolutionsOpen}
            >
              <span className={isSolutionsActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}>
                Services
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isSolutionsOpen ? 'rotate-180' : ''
                } ${isSolutionsActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
              />
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-blue-500 transition-transform duration-300 ease-out ${
                  isSolutionsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>

            <AnimatePresence>
              {isSolutionsOpen && (
                <motion.div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <div className="w-[540px] rounded-lg border border-white/10 bg-gray-900 p-2 shadow-xl">
                    <div className="grid grid-cols-2 gap-0.5">
                      {services.map((link) => {
                        const active = pathname === link.path;
                        return (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsSolutionsOpen(false)}
                            className={`block rounded-md px-3 py-2.5 transition-colors ${
                              active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.06]'
                            }`}
                          >
                            <div className="text-sm font-medium text-white">{link.title}</div>
                            <div className="mt-0.5 text-xs text-gray-400">{link.desc}</div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mx-2 my-1.5 border-t border-white/10" />
                    <Link
                      href={allServices.path}
                      onClick={() => setIsSolutionsOpen(false)}
                      className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-blue-400 transition-colors hover:bg-white/[0.06]"
                    >
                      View all services
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.slice(1).map((item) => (
            <NavLink key={item.path} href={item.path} label={item.title} active={pathname === item.path} />
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center">
          <Link href={createPageUrl('Contact')}>
            <button className="gold-button !m-0 !rounded-md !px-6 !py-2.5 text-sm font-semibold">
              <span className="text">Get in Touch</span>
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-gray-200 transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          type="button"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-gray-900 lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              <Link
                href={createPageUrl('Home')}
                onClick={closeMenu}
                className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                  pathname === createPageUrl('Home')
                    ? 'bg-white/[0.06] text-white'
                    : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Home
              </Link>

              {/* Services accordion */}
              <div>
                <button
                  onClick={() => setIsMobileSolutionsOpen((p) => !p)}
                  type="button"
                  aria-label="Toggle services submenu"
                  className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    isSolutionsActive ? 'bg-white/[0.06] text-white' : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isMobileSolutionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 space-y-0.5 border-l border-white/10 pl-3">
                        <Link
                          href={allServices.path}
                          onClick={closeMenu}
                          className="block rounded-md px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-white/[0.06]"
                        >
                          All Services
                        </Link>
                        {services.map((link) => {
                          const active = pathname === link.path;
                          return (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={closeMenu}
                              className={`block rounded-md px-4 py-2.5 text-sm transition-colors ${
                                active ? 'bg-white/[0.06] text-white' : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'
                              }`}
                            >
                              {link.title}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === item.path
                      ? 'bg-white/[0.06] text-white'
                      : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              <div className="pt-3">
                <Link href={createPageUrl('Contact')} onClick={closeMenu} className="block">
                  <button className="gold-button !m-0 !w-full !rounded-md !py-3 text-sm font-semibold">
                    <span className="text">Get in Touch</span>
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
