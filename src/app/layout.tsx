import type { Metadata } from 'next';
import { Architects_Daughter, Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-architects',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://plashafodcottage.co.uk'),
  title: 'Bwthyn Plas Hafod Cottage - Cozy Cottage with Amazing Views',
  description:
    'Plas Hafod Cottage offers a warm and cozy traditional Welsh cottage in a location with views that will take your breath away. Book now to secure your stay.',
  icons: {
    icon: '/images/wp/logo-color.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${architectsDaughter.variable} ${montserrat.variable} ${roboto.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen bg-[#fcfcfd] text-[#333333] antialiased font-sans ${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}
