import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_CONFIG = {
  '/': {
    title: 'Scale Up with AI | #1 AI Agent Development & Custom LLM Solutions',
    description: 'Scale up your business with AI agents, custom LLM pipelines, voice agents, sales assistants, and computer vision tools. Expert AI consulting and implementation services.',
    keywords: 'scale up with ai, scale up, scale up ai, scale up agent, scale up ai agent, ai voice agent, ai sales agent, custom llm, ai automation, ai consulting, machine learning, computer vision, artificial intelligence business solutions',
    type: 'website'
  },
  '/services': {
    title: 'AI Services & Solutions | Scale Up with AI - Voice Agents, Sales Automation, Custom LLM',
    description: 'Comprehensive AI services including voice agents, sales automation, custom LLM pipelines, computer vision tools, and staff training programs. Scale up your business with AI.',
    keywords: 'ai services, ai solutions, scale up ai services, voice agent services, sales agent automation, custom llm development, ai consulting services, computer vision solutions',
    type: 'service'
  },
  '/solutions': {
    title: 'AI Solutions & Products | Scale Up AI - Ready-to-Deploy AI Tools',
    description: 'Ready-to-deploy AI solutions including voice agents, sales assistants, custom LLM pipelines, and computer vision tools. Scale up your business operations with AI.',
    keywords: 'ai solutions, ai products, scale up ai solutions, ai voice agent, ai sales assistant, custom llm solutions, computer vision tools, ai automation solutions',
    type: 'service'
  },
  '/expertise': {
    title: 'AI Expertise & Consulting | Scale Up AI - Machine Learning & LLM Specialists',
    description: 'Expert AI consulting team specializing in machine learning, LLMs, computer vision, and prompt engineering. Scale up your AI capabilities with our expertise.',
    keywords: 'ai expertise, ai consulting, machine learning experts, llm specialists, ai consultants, scale up ai expertise, prompt engineering, computer vision experts',
    type: 'about'
  },
  '/contact': {
    title: 'Contact Scale Up AI | Get Your Free AI Consultation - Scale Up with AI',
    description: 'Contact Scale Up AI for your free consultation. Discuss how AI agents, custom LLM solutions, and automation can scale up your business operations.',
    keywords: 'contact scale up ai, ai consultation, scale up contact, ai consulting contact, free ai consultation, ai development contact',
    type: 'contact'
  },
  '/aivoiceagent': {
    title: 'AI Voice Agent Development | 24/7 Customer Service Automation - Scale Up AI',
    description: 'Advanced AI voice agents for customer service, appointment booking, and support calls. Natural conversations with CRM integration. Scale up your customer service.',
    keywords: 'ai voice agent, voice automation, customer service ai, appointment booking ai, scale up voice agent, conversational ai, voice assistant development',
    type: 'service'
  },
  '/aisalesassistant': {
    title: 'AI Sales Agent & Assistant | Boost Sales Performance - Scale Up AI',
    description: 'AI sales agents that provide real-time suggestions, generate scripts, automate follow-ups, and sync with CRM. Scale up your sales team performance.',
    keywords: 'ai sales agent, sales automation, ai sales assistant, sales ai, crm automation, scale up sales, sales performance ai, lead generation ai',
    type: 'service'
  },
  '/customllm': {
    title: 'Custom LLM Pipelines & Development | Enterprise AI Solutions - Scale Up AI',
    description: 'Custom large language model pipelines for document processing, content creation, and knowledge management. Enterprise-grade LLM solutions to scale up operations.',
    keywords: 'custom llm, llm development, large language models, custom ai models, enterprise llm, scale up llm, ai pipeline development, document ai',
    type: 'service'
  },
  '/stafftrainingprogram': {
    title: 'AI Staff Training Programs | Empower Your Team - Scale Up AI',
    description: 'Comprehensive AI training programs including prompt engineering, LLM navigation, and custom tool training. Scale up your team\'s AI capabilities.',
    keywords: 'ai training, staff ai training, prompt engineering training, llm training, ai education, scale up ai training, ai skills development',
    type: 'service'
  },
  '/computervisiontools': {
    title: 'Computer Vision Tools & Solutions | Image & Video AI - Scale Up AI',
    description: 'Advanced computer vision tools for quality control, inventory management, object detection, and automated inspection. Scale up with visual AI solutions.',
    keywords: 'computer vision, image ai, video ai, object detection, quality control ai, inventory ai, visual inspection ai, scale up computer vision',
    type: 'service'
  },
  '/blog': {
    title: 'AI Insights & Strategies Blog | Scale Up with AI - Expert Guidance',
    description: 'Expert insights on scaling up your business with AI agents, custom LLM solutions, voice automation, and AI implementation strategies. Scale up with AI knowledge.',
    keywords: 'ai blog, scale up ai insights, ai implementation strategies, ai business insights, machine learning blog, ai consulting blog, ai transformation guide',
    type: 'blog'
  }
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Organization",
    "name": "Scale Up AI",
    "url": "https://scaleupai.com"
  },
  "areaServed": "Worldwide",
  "audience": {
    "@type": "Audience",
    "audienceType": "Business"
  }
};

export default function SEO({ 
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://scaleupai.com/logo.png",
  structuredData
}) {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    const seoConfig = SEO_CONFIG[currentPath] || SEO_CONFIG['/'];
    
    // Use props or fallback to route-specific config
    const finalTitle = title || seoConfig.title;
    const finalDescription = description || seoConfig.description;
    const finalKeywords = keywords || seoConfig.keywords;
    const finalCanonical = canonical || `https://scaleupai.com${currentPath === '/' ? '' : currentPath}`;
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:url', finalCanonical);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', ogImage);
    
    // Update canonical link
    updateCanonicalLink(finalCanonical);
    
    // Add service-specific structured data
    if (seoConfig.type === 'service') {
      const serviceSchema = {
        ...SERVICE_SCHEMA,
        "name": finalTitle.split('|')[0].trim(),
        "description": finalDescription,
        "url": finalCanonical
      };
      updateStructuredData('service-schema', serviceSchema);
    }
    
    // Add custom structured data if provided
    if (structuredData) {
      updateStructuredData('custom-schema', structuredData);
    }
    
  }, [location.pathname, title, description, keywords, canonical, ogImage, structuredData]);
  
  return null; // This component doesn't render anything
}

function updateMetaTag(property, content) {
  let meta = document.querySelector(`meta[name="${property}"]`) || 
             document.querySelector(`meta[property="${property}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

function updateCanonicalLink(href) {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', href);
}

function updateStructuredData(id, data) {
  let script = document.querySelector(`script[data-schema="${id}"]`);
  
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', id);
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(data);
}
