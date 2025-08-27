import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Advanced SEO-optimized Vite configuration
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin for SEO optimizations
    {
      name: 'seo-optimizations',
      generateBundle(options, bundle) {
        // Optimize chunk naming for better caching
        Object.keys(bundle).forEach(fileName => {
          const chunk = bundle[fileName];
          if (chunk.type === 'chunk' && chunk.isEntry) {
            chunk.fileName = 'assets/main-[hash].js';
          }
        });
      }
    }
  ],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
    // Pre-bundle heavy dependencies for faster loading
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ]
  },
  build: {
    target: 'es2020',
    // SEO-optimized build settings
    rollupOptions: {
      output: {
        // Better code splitting for performance
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          icons: ['lucide-react']
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Enable compression and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        reduce_vars: true,
        unused: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Enable source maps for better debugging (disable in production)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Asset optimization
    assetsInlineLimit: 4096, // Inline small assets
    // Enable progressive enhancement
    polyfillModulePreload: true
  },
  // SEO-friendly dev server settings
  preview: {
    port: 3000,
    host: true,
    strictPort: true
  }
})
