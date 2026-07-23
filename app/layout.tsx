import type { Metadata, Viewport } from 'next';
import SourceTracker from '../src/components/SourceTracker';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Scale Up AI',
  description:
    'From Strategy to Agents, Scale Up with AI. Expert consulting for businesses ready to harness the power of artificial intelligence.',
  icons: {
    icon: '/logo.webp',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://app.cal.com" />
        <link rel="preconnect" href="https://storage.vapi.ai" />
        {/* Resource hints for better mobile performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      </head>
      <body>
        <SourceTracker />
        {children}
      </body>
    </html>
  );
}
