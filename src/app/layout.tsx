import type { Metadata } from 'next';
import './globals.css';
import { EcoProvider } from '../context/EcoContext';
import { Web3Provider } from '../context/Web3Context';

export const metadata: Metadata = {
  title: 'Air Shaktiman — AI-Powered Eco Platform',
  description: 'Turn Waste Into Impact. AI-powered circular economy platform for communities, government, and organizations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8F9FA] text-[#202124] min-h-screen antialiased font-sans">
        <Web3Provider>
          <EcoProvider>{children}</EcoProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
