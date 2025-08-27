import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component to optimize internal linking for better SEO
export default function InternalLinkOptimizer() {
  const location = useLocation();

  useEffect(() => {
    addStrategicInternalLinks();
    optimizeExistingLinks();
    addBreadcrumbStructure();
    setupLinkTracking();
  }, [location.pathname]);

  const addStrategicInternalLinks = () => {
    // Define strategic internal linking opportunities
    const linkingStrategy = {
      // Keywords and their target pages
      'scale up with ai': '/services',
      'ai voice agent': '/aivoiceagent',
      'ai sales agent': '/aisalesassistant', 
      'custom llm': '/customllm',
      'computer vision': '/computervisiontools',
      'ai consulting': '/expertise',
      'ai training': '/stafftrainingprogram',
      'contact us': '/contact',
      'get started': '/contact'
    };

    // Find text content and add contextual links
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip if already inside a link or script/style
          if (node.parentElement.tagName === 'A' || 
              node.parentElement.tagName === 'SCRIPT' ||
              node.parentElement.tagName === 'STYLE') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      let content = textNode.textContent;
      let hasChanges = false;

      Object.entries(linkingStrategy).forEach(([keyword, url]) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        if (regex.test(content) && !content.includes('<a')) {
          // Only link the first occurrence per page
          const existingLinks = document.querySelectorAll(`a[href="${url}"]`);
          if (existingLinks.length < 3) { // Limit to 3 links per target page
            content = content.replace(regex, `<a href="${url}" class="internal-link text-blue-600 hover:text-blue-800 transition-colors" title="Learn more about ${keyword}">${keyword}</a>`);
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = content;
        textNode.parentNode.replaceChild(wrapper, textNode);
      }
    });
  };

  const optimizeExistingLinks = () => {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Add SEO attributes to internal links
      if (href.startsWith('/') || href.includes(window.location.hostname)) {
        // Internal link optimizations
        if (!link.hasAttribute('title') && link.textContent) {
          link.setAttribute('title', `Learn more about ${link.textContent.trim()}`);
        }
        
        // Add structured data attributes
        link.setAttribute('data-internal-link', 'true');
        
        // Add click tracking
        link.addEventListener('click', (e) => {
          // Track internal link clicks for analytics
          if (window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'Internal Link',
              event_label: href,
              value: 1
            });
          }
        });
      } else if (href.startsWith('http')) {
        // External link optimizations
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }
      }

      // Add descriptive aria-labels for accessibility
      if (!link.hasAttribute('aria-label') && link.textContent) {
        const description = getDescriptiveLabel(link.textContent.trim(), href);
        link.setAttribute('aria-label', description);
      }
    });
  };

  const getDescriptiveLabel = (text, href) => {
    const pageDescriptions = {
      '/': 'Scale Up AI homepage',
      '/services': 'AI services and solutions',
      '/solutions': 'AI solutions and products',
      '/expertise': 'AI expertise and consulting',
      '/contact': 'Contact Scale Up AI',
      '/aivoiceagent': 'AI voice agent development services',
      '/aisalesassistant': 'AI sales agent solutions',
      '/customllm': 'Custom LLM development services',
      '/stafftrainingprogram': 'AI staff training programs',
      '/computervisiontools': 'Computer vision tools and solutions',
      '/blog': 'AI insights and strategies blog'
    };

    return pageDescriptions[href] || `Learn more about ${text}`;
  };

  const addBreadcrumbStructure = () => {
    // Only add breadcrumbs if not on homepage
    if (location.pathname === '/') return;

    const breadcrumbContainer = document.querySelector('.breadcrumb-container');
    if (breadcrumbContainer) return; // Already exists

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return;

    const breadcrumbNav = document.createElement('nav');
    breadcrumbNav.className = 'breadcrumb-container py-4 px-6 bg-gray-50';
    breadcrumbNav.setAttribute('aria-label', 'Breadcrumb navigation');

    const breadcrumbList = document.createElement('ol');
    breadcrumbList.className = 'flex items-center space-x-2 text-sm';
    breadcrumbList.setAttribute('itemscope', '');
    breadcrumbList.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

    // Add home link
    const homeItem = createBreadcrumbItem('Scale Up AI', '/', 1, false);
    breadcrumbList.appendChild(homeItem);

    // Add current page
    const currentPageName = getCurrentPageName(location.pathname);
    const currentItem = createBreadcrumbItem(currentPageName, location.pathname, 2, true);
    breadcrumbList.appendChild(currentItem);

    breadcrumbNav.appendChild(breadcrumbList);

    // Insert breadcrumbs at the top of main content
    const main = document.querySelector('main');
    if (main && main.firstChild) {
      main.insertBefore(breadcrumbNav, main.firstChild);
    }
  };

  const createBreadcrumbItem = (name, url, position, isCurrent) => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center';
    listItem.setAttribute('itemprop', 'itemListElement');
    listItem.setAttribute('itemscope', '');
    listItem.setAttribute('itemtype', 'https://schema.org/ListItem');

    if (position > 1) {
      const separator = document.createElement('span');
      separator.className = 'mx-2 text-gray-400';
      separator.innerHTML = '→';
      listItem.appendChild(separator);
    }

    if (isCurrent) {
      const span = document.createElement('span');
      span.className = 'text-gray-600 font-medium';
      span.textContent = name;
      span.setAttribute('itemprop', 'name');
      listItem.appendChild(span);
      
      const meta = document.createElement('meta');
      meta.setAttribute('itemprop', 'position');
      meta.setAttribute('content', position.toString());
      listItem.appendChild(meta);
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.className = 'text-blue-600 hover:text-blue-800 transition-colors';
      link.textContent = name;
      link.setAttribute('itemprop', 'item');
      
      const span = document.createElement('span');
      span.setAttribute('itemprop', 'name');
      span.textContent = name;
      link.appendChild(span);
      
      listItem.appendChild(link);
      
      const meta = document.createElement('meta');
      meta.setAttribute('itemprop', 'position');
      meta.setAttribute('content', position.toString());
      listItem.appendChild(meta);
    }

    return listItem;
  };

  const getCurrentPageName = (pathname) => {
    const pageNames = {
      '/services': 'AI Services',
      '/solutions': 'AI Solutions', 
      '/expertise': 'AI Expertise',
      '/contact': 'Contact Us',
      '/aivoiceagent': 'AI Voice Agent',
      '/aisalesassistant': 'AI Sales Agent',
      '/customllm': 'Custom LLM',
      '/stafftrainingprogram': 'AI Training',
      '/computervisiontools': 'Computer Vision',
      '/blog': 'AI Insights Blog'
    };

    return pageNames[pathname] || 'Page';
  };

  const setupLinkTracking = () => {
    // Add JSON-LD for tracking internal link structure
    const linkStructureSchema = {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "name": "Site Navigation",
      "url": window.location.origin,
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "AI Services",
          "url": `${window.location.origin}/services`
        },
        {
          "@type": "SiteNavigationElement", 
          "name": "AI Solutions",
          "url": `${window.location.origin}/solutions`
        },
        {
          "@type": "SiteNavigationElement",
          "name": "AI Expertise", 
          "url": `${window.location.origin}/expertise`
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contact",
          "url": `${window.location.origin}/contact`
        }
      ]
    };

    let script = document.querySelector('script[data-schema="navigation-schema"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-schema', 'navigation-schema');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(linkStructureSchema);
  };

  return null; // This component only handles link optimization
}
