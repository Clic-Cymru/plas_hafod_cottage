import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://plashafod.co.uk'),
  title: 'Plas Hafod | Luxury Welsh Cottage Retreat in Eryri (Snowdonia)',
  description:
    'Experience authentic Welsh tranquility at Plas Hafod, a restored 18th-century stone holiday cottage with inglenook fireplace, mountain views, and luxury comforts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-stone-950 text-stone-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
