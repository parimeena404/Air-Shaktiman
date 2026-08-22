import type { Metadata } from 'next';
import './globals.css';
import { EcoProvider } from '../context/EcoContext';

export const metadata: Metadata = {
  title: 'EcoVerse — AI-Powered Circular Campus Platform',
  description: 'Turn Waste Into Impact. AI-powered circular economy platform for college campuses and communities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-squid-dark text-slate-100 min-h-screen antialiased squid-grid-bg font-sans">
        <EcoProvider>{children}</EcoProvider>
      </body>
    </html>
  );
}
