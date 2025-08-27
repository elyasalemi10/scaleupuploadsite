import { useEffect } from 'react';

// Component to optimize images for better SEO and performance
export default function ImageOptimization() {
  
  useEffect(() => {
    // Add lazy loading and optimization to all images
    optimizeAllImages();
    
    // Set up intersection observer for progressive image loading
    setupProgressiveImageLoading();
    
    // Add WebP support detection
    detectWebPSupport();
    
  }, []);

  const optimizeAllImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Add lazy loading (except for hero/above-fold images)
      if (index > 2 && !img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decode optimization
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
      
      // Add fetchpriority for critical images
      if (index <= 2 && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('fetchpriority', 'high');
      }
      
      // Add responsive image attributes
      if (!img.hasAttribute('sizes')) {
        // Default responsive sizes
        img.setAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw');
      }
      
      // Add error handling
      img.addEventListener('error', () => {
        console.warn(`Failed to load image: ${img.src}`);
        // Fallback to a placeholder or alternative image
        if (!img.hasAttribute('data-error-handled')) {
          img.setAttribute('data-error-handled', 'true');
          // You could set a fallback image here if needed
        }
      });
      
      // Add load event for performance tracking
      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease-in-out';
      });
    });
  };

  const setupProgressiveImageLoading = () => {
    // Create intersection observer for better image loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load high-quality image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Load srcset if available
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  const detectWebPSupport = () => {
    // Feature detection for WebP support
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      const hasWebPSupport = webP.height === 2;
      document.documentElement.classList.toggle('webp', hasWebPSupport);
      document.documentElement.classList.toggle('no-webp', !hasWebPSupport);
      
      // Store support in localStorage for future use
      localStorage.setItem('webp-support', hasWebPSupport.toString());
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  // Add critical CSS for image optimization
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Image optimization styles */
      img {
        max-width: 100%;
        height: auto;
      }
      
      img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      img[loading="lazy"].loaded {
        opacity: 1;
      }
      
      /* WebP fallback support */
      .webp .png-fallback {
        display: none;
      }
      
      .no-webp .webp-image {
        display: none;
      }
      
      /* Progressive enhancement for images */
      img {
        background-color: #f3f4f6;
        background-image: linear-gradient(45deg, #f3f4f6 25%, transparent 25%),
                          linear-gradient(-45deg, #f3f4f6 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #f3f4f6 75%),
                          linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      }
      
      /* Responsive image containers */
      .responsive-image-container {
        position: relative;
        overflow: hidden;
      }
      
      .responsive-image-container::before {
        content: '';
        display: block;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
      }
      
      .responsive-image-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return null; // This component only handles image optimization
}

// Utility function to generate responsive image URLs
export const generateResponsiveImageUrls = (baseUrl, sizes = [400, 800, 1200, 1600]) => {
  const extension = baseUrl.split('.').pop();
  const baseName = baseUrl.replace(`.${extension}`, '');
  
  return {
    srcSet: sizes.map(size => `${baseName}-${size}w.webp ${size}w`).join(', '),
    fallbackSrcSet: sizes.map(size => `${baseName}-${size}w.${extension} ${size}w`).join(', '),
    src: `${baseName}-800w.webp`,
    fallbackSrc: baseUrl
  };
};

// Utility function to create optimized image component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props 
}) => {
  const responsiveUrls = generateResponsiveImageUrls(src);
  
  return (
    <picture className={className}>
      <source
        srcSet={responsiveUrls.srcSet}
        sizes={sizes}
        type="image/webp"
      />
      <source
        srcSet={responsiveUrls.fallbackSrcSet}
        sizes={sizes}
        type={`image/${src.split('.').pop()}`}
      />
      <img
        src={priority ? responsiveUrls.src : responsiveUrls.fallbackSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};
