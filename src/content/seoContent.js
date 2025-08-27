// SEO-optimized content for better search rankings

export const SEO_KEYWORDS = {
  primary: [
    'scale up with ai',
    'scale up',
    'scale up ai',
    'scale up agent',
    'scale up ai agent'
  ],
  secondary: [
    'ai voice agent',
    'ai sales agent',
    'custom llm',
    'ai automation',
    'ai consulting',
    'machine learning solutions',
    'computer vision tools',
    'ai development',
    'artificial intelligence business',
    'ai implementation',
    'business ai solutions',
    'enterprise ai',
    'ai integration',
    'ai transformation',
    'intelligent automation'
  ],
  longTail: [
    'how to scale up business with ai',
    'best ai agents for business',
    'custom ai solutions for enterprises',
    'ai voice automation for customer service',
    'sales automation with artificial intelligence',
    'machine learning consulting services',
    'ai implementation for small business',
    'enterprise ai development services',
    'custom llm development company',
    'ai consulting firm',
    'business process automation ai',
    'ai transformation consulting'
  ]
};

export const SEMANTIC_KEYWORDS = [
  // AI and automation related
  'artificial intelligence',
  'machine learning',
  'deep learning',
  'natural language processing',
  'computer vision',
  'prompt engineering',
  'llm fine-tuning',
  'ai model training',
  'neural networks',
  'ai algorithms',
  
  // Business and scaling related
  'business automation',
  'digital transformation',
  'productivity enhancement',
  'operational efficiency',
  'business optimization',
  'growth automation',
  'process improvement',
  'cost reduction',
  'revenue growth',
  'competitive advantage',
  
  // Industry specific
  'customer service automation',
  'sales process optimization',
  'lead generation automation',
  'document processing ai',
  'quality control automation',
  'inventory management ai',
  'chatbot development',
  'voice assistant technology',
  'conversational ai',
  'ai-powered analytics'
];

export const CONTENT_SNIPPETS = {
  homeHero: {
    title: "Scale Up with AI Agents & Custom LLM Solutions",
    subtitle: "Transform Your Business with Intelligent Automation",
    description: "Scale up your business operations with cutting-edge AI agents, custom LLM pipelines, voice automation, and computer vision tools. Expert AI consulting and implementation services that deliver measurable results.",
    cta: "Start Your AI Transformation"
  },
  
  metaDescriptions: {
    home: "Scale up your business with AI agents, custom LLM pipelines, voice agents, sales assistants, and computer vision tools. Expert AI consulting and implementation services.",
    services: "Comprehensive AI services including voice agents, sales automation, custom LLM pipelines, computer vision tools, and staff training programs. Scale up your business with AI.",
    aiVoiceAgent: "Advanced AI voice agents for customer service, appointment booking, and support calls. Natural conversations with CRM integration. Scale up your customer service.",
    aiSalesAgent: "AI sales agents that provide real-time suggestions, generate scripts, automate follow-ups, and sync with CRM. Scale up your sales team performance.",
    customLLM: "Custom large language model pipelines for document processing, content creation, and knowledge management. Enterprise-grade LLM solutions to scale up operations.",
    computerVision: "Advanced computer vision tools for quality control, inventory management, object detection, and automated inspection. Scale up with visual AI solutions."
  },
  
  featuredServices: [
    {
      name: "AI Voice Agent Development",
      description: "Scale up customer interactions with intelligent voice agents that handle support calls, bookings, and inquiries 24/7 with natural conversation capabilities.",
      keywords: ["ai voice agent", "voice automation", "customer service ai", "conversational ai"]
    },
    {
      name: "AI Sales Agent Solutions",
      description: "Scale up sales performance with AI agents that qualify leads, provide real-time insights, automate follow-ups, and integrate seamlessly with your CRM.",
      keywords: ["ai sales agent", "sales automation", "lead qualification", "crm integration"]
    },
    {
      name: "Custom LLM Pipeline Development",
      description: "Scale up operations with custom large language model pipelines designed for document processing, content generation, and knowledge management systems.",
      keywords: ["custom llm", "language model development", "document ai", "content automation"]
    },
    {
      name: "Computer Vision Tools",
      description: "Scale up visual operations with advanced computer vision solutions for quality control, inventory tracking, object detection, and automated inspection.",
      keywords: ["computer vision", "image ai", "quality control automation", "object detection"]
    }
  ]
};

export const STRUCTURED_DATA_TEMPLATES = {
  service: (serviceName, description, url) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Scale Up AI",
      "url": "https://scaleupai.com"
    },
    "url": url,
    "areaServed": "Worldwide",
    "audience": {
      "@type": "Audience",
      "audienceType": "Business"
    }
  }),
  
  faq: (questions) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }),
  
  howTo: (name, steps) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.description
    }))
  })
};

export const FAQ_DATA = [
  {
    question: "How can AI agents help scale up my business?",
    answer: "AI agents can scale up your business by automating customer service, sales processes, and operational tasks. They work 24/7, handle multiple interactions simultaneously, and integrate with your existing systems to boost productivity and reduce costs."
  },
  {
    question: "What makes Scale Up AI different from other AI consulting firms?",
    answer: "Scale Up AI specializes in practical, results-driven AI implementations. We focus on custom LLM solutions, voice agents, and computer vision tools that deliver immediate value. Our team has deep expertise in prompt engineering, machine learning, and business automation."
  },
  {
    question: "How long does it take to implement AI solutions?",
    answer: "Implementation timelines vary by project complexity. Simple AI voice agents can be deployed in 2-4 weeks, while custom LLM pipelines may take 6-12 weeks. We provide detailed timelines during our free consultation."
  },
  {
    question: "Do you provide ongoing support after AI implementation?",
    answer: "Yes, we provide comprehensive ongoing support including monitoring, optimization, updates, and staff training. Our goal is to ensure your AI solutions continue to scale up your business operations effectively."
  },
  {
    question: "What industries can benefit from AI automation?",
    answer: "Virtually any industry can scale up with AI. We've successfully implemented solutions in healthcare, finance, retail, manufacturing, real estate, and professional services. AI agents and automation tools are versatile and adaptable."
  }
];

export default {
  SEO_KEYWORDS,
  SEMANTIC_KEYWORDS,
  CONTENT_SNIPPETS,
  STRUCTURED_DATA_TEMPLATES,
  FAQ_DATA
};
