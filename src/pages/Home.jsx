import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquareText, 
  Smartphone, 
  Eye, 
  Zap, 
  Target, 
  Settings, 
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

import HeroSection from '../components/home/HeroSection';
import ProcessSection from '../components/home/ProcessSection';
import SolutionsSection from '../components/home/SolutionsSection';
import ContactSection from '../components/home/ContactSection';
// import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      <main>
        <HeroSection />
        <ProcessSection />
        <SolutionsSection />
        {/* <FAQ /> */}
        <ContactSection />
      </main>
      
    </div>
  );
}