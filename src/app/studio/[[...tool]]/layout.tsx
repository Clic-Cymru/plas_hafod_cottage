export const metadata = {
  title: 'Plas Hafod Studio | Cottage Management',
  description: 'Manage cottage pricing, seasonal rates, blocked dates, and booking inquiries.',
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-screen overflow-hidden">{children}</div>;
}
