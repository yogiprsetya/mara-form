import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '~/utils/css';
import { ThemeProvider } from 'next-themes';
import { NextAuthProvider } from '~/components/layout/NextAuthProvider';
import { SWRProvider } from '~/components/layout/SWRProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SWRProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
