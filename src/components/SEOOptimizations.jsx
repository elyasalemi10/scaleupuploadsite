import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Advanced SEO optimizations without changing any text content
export default function SEOOptimizations() {
  const location = useLocation();

  useEffect(() => {
    // Add enhanced schema markup for better search results
    addServiceSchema();
    addLocalBusinessSchema();
    addWebsiteSchema();
    addImageSchema();
    
    // Optimize images with lazy loading and WebP support
    optimizeImages();
    
    // Add preloading for critical resources
    addCriticalResourceHints();
    
    // Add additional meta tags for better SEO
    addAdvancedMetaTags();
    
  }, [location.pathname]);

  const addServiceSchema = () => {
    const services = [
      {
        name: "AI Voice Agent Development",
        description: "Scale up customer service with intelligent AI voice agents",
        category: "Software Development",
        provider: "Scale Up AI"
      },
      {
        name: "AI Sales Agent Solutions", 
        description: "Scale up sales performance with AI sales automation",
        category: "Sales Automation",
        provider: "Scale Up AI"
      },
      {
        name: "Custom LLM Development",
        description: "Scale up operations with custom language model pipelines", 
        category: "Machine Learning",
        provider: "Scale Up AI"
      },
      {
        name: "Computer Vision Tools",
        description: "Scale up visual operations with computer vision solutions",
        category: "Computer Vision",
        provider: "Scale Up AI"
      }
    ];

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "category": service.category,
          "provider": {
            "@type": "Organization",
            "name": service.provider,
            "url": "https://scaleupai.com"
          },
          "areaServed": "Worldwide",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://scaleupai.com/contact",
            "serviceType": "Online consultation"
          }
        }
      }))
    };

    updateSchemaScript('service-list-schema', serviceSchema);
  };

  const addLocalBusinessSchema = () => {
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Scale Up AI",
      "description": "Expert AI consulting and development services specializing in AI agents, custom LLM pipelines, voice agents, sales assistants, and computer vision tools",
      "url": "https://scaleupai.com",
      "logo": "https://scaleupai.com/logo.png",
      "image": "https://scaleupai.com/logo.png",
      "telephone": "+61384004145",
      "email": "iscaleupwithai@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Level 19, 263 William St",
        "addressLocality": "Melbourne",
        "postalCode": "3000",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -37.8136,
        "longitude": 144.9631
      },
      "openingHours": "Mo-Fr 09:00-17:00",
      "serviceArea": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Services",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "AI Voice Agents",
            "itemListElement": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Voice Agent Development"
              }
            }
          },
          {
            "@type": "OfferCatalog", 
            "name": "AI Sales Agents",
            "itemListElement": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Sales Agent Solutions"
              }
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "25",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    updateSchemaScript('local-business-schema', businessSchema);
  };

  const addWebsiteSchema = () => {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Scale Up AI",
      "alternateName": "Scale Up with AI",
      "url": "https://scaleupai.com",
      "description": "Scale up your business with AI agents, custom LLM pipelines, voice agents, sales assistants, and computer vision tools",
      "inLanguage": "en-US",
      "copyrightYear": "2024",
      "publisher": {
        "@type": "Organization",
        "name": "Scale Up AI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://scaleupai.com/logo.png",
          "width": 400,
          "height": 400
        }
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://scaleupai.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        {
          "@type": "SubscribeAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://scaleupai.com/contact"
          }
        }
      ],
      "mainEntity": {
        "@type": "WebPage",
        "@id": "https://scaleupai.com/#webpage"
      }
    };

    updateSchemaScript('website-schema', websiteSchema);
  };

  const addImageSchema = () => {
    const images = [
      {
        url: "https://scaleupai.com/voice_agent_light.png",
        caption: "AI Voice Agent Development Services",
        name: "AI Voice Agent"
      },
      {
        url: "https://scaleupai.com/sales_agent_light.png", 
        caption: "AI Sales Agent Automation Solutions",
        name: "AI Sales Agent"
      },
      {
        url: "https://scaleupai.com/llm_pipelines_light.png",
        caption: "Custom LLM Pipeline Development",
        name: "Custom LLM Pipelines"
      },
      {
        url: "https://scaleupai.com/computer_vision_tools_light.png",
        caption: "Computer Vision Tools and Solutions",
        name: "Computer Vision Tools"
      }
    ];

    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery", 
      "name": "Scale Up AI Services Gallery",
      "description": "Visual representation of AI services offered by Scale Up AI",
      "image": images.map(img => ({
        "@type": "ImageObject",
        "url": img.url,
        "name": img.name,
        "caption": img.caption,
        "encodingFormat": "image/png",
        "author": {
          "@type": "Organization",
          "name": "Scale Up AI"
        }
      }))
    };

    updateSchemaScript('image-gallery-schema', imageSchema);
  };

  const optimizeImages = () => {
    // Add WebP support detection and lazy loading
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decode hint for performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
      
      // Add responsive image attributes if not present
      if (!img.hasAttribute('sizes') && img.src.includes('light.png')) {
        img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
      }
    });
  };

  const addCriticalResourceHints = () => {
    const hints = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://storage.vapi.ai' },
      { rel: 'dns-prefetch', href: 'https://app.cal.com' },
      { rel: 'preload', href: '/logo.png', as: 'image', type: 'image/png' },
      { rel: 'preload', href: '/navbar_logo.png', as: 'image', type: 'image/png' }
    ];

    hints.forEach(hint => {
      if (!document.querySelector(`link[href="${hint.href}"]`)) {
        const link = document.createElement('link');
        Object.keys(hint).forEach(key => {
          if (hint[key] === true) {
            link.setAttribute(key, '');
          } else {
            link.setAttribute(key, hint[key]);
          }
        });
        document.head.appendChild(link);
      }
    });
  };

  const addAdvancedMetaTags = () => {
    const metaTags = [
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'referrer', content: 'no-referrer-when-downgrade' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: 'Scale Up AI' },
      { name: 'apple-mobile-web-app-title', content: 'Scale Up AI' },
      { name: 'msapplication-tooltip', content: 'Scale Up with AI - Expert AI Consulting' },
      { name: 'msapplication-starturl', content: 'https://scaleupai.com' },
      { property: 'og:site_name', content: 'Scale Up AI' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@scaleupai' },
      { property: 'twitter:creator', content: '@scaleupai' }
    ];

    metaTags.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
      if (!document.querySelector(selector)) {
        const meta = document.createElement('meta');
        if (tag.name) meta.setAttribute('name', tag.name);
        if (tag.property) meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });
  };

  const updateSchemaScript = (id, schema) => {
    let script = document.querySelector(`script[data-schema="${id}"]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', id);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  };

  return null; // This component only handles SEO optimizations
}
