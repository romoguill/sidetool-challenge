import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sidetool - Tasks Management App',
  description: 'App made for Sidetool dev challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
