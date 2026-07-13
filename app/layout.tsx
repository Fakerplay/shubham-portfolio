import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeContext'
import LightLeakBackground from '@/components/LightLeakBackground'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import StructuredData from '@/components/StructuredData'
import {
  DEFAULT_SHARE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
} from '@/lib/site'

const exposure = localFont({
  src: [
    {
      path: '../public/fonts/ExposureTrialVAR.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/ExposureTrialVAR-Italic.ttf',
      weight: '100 900',
      style: 'italic',
    }
  ],
  variable: '--font-exposure',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'design',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: `${SITE_NAME} Portfolio`,
    locale: 'en_IN',
    images: [
      {
        url: DEFAULT_SHARE_IMAGE,
        width: 1024,
        height: 576,
        alt: `${SITE_NAME} portfolio featured work`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0b101c' },
  ],
}

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      url: SITE_URL,
      name: `${SITE_NAME} Portfolio`,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-IN',
      publisher: { '@id': absoluteUrl('/#shubham-shinde') },
    },
    {
      '@type': 'ProfilePage',
      '@id': absoluteUrl('/#profile'),
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      mainEntity: { '@id': absoluteUrl('/#shubham-shinde') },
      isPartOf: { '@id': absoluteUrl('/#website') },
    },
    {
      '@type': 'Person',
      '@id': absoluteUrl('/#shubham-shinde'),
      name: SITE_NAME,
      url: SITE_URL,
      image: absoluteUrl('/images/avatar.jpg'),
      description: SITE_DESCRIPTION,
      jobTitle: 'Brand, Web & Motion Designer',
      homeLocation: {
        '@type': 'Place',
        name: 'Pune, India',
      },
      knowsAbout: [
        'Brand identity',
        'Web design',
        'Motion design',
        'Creative direction',
        'Visual storytelling',
      ],
      sameAs: Object.values(SOCIAL_LINKS),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={exposure.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-zinc-800 selection:text-white transition-colors duration-500">
        <StructuredData id="portfolio-profile-data" data={profileJsonLd} />
        <ThemeProvider>
          {/* WebGL Animated Light Leak Background */}
          <LightLeakBackground />
          
          {/* Tactile 50% Fine Noise Overlay */}
          <div className="pointer-events-none fixed inset-0 z-30 bg-noise opacity-[0.06] mix-blend-overlay" />

          {/* Fixed Header Layout with Auto-Hide on Scroll */}
          <Header />




          {/* Main Content Area */}
          <main className="flex-grow flex flex-col w-full relative z-10">
            {children}
          </main>

          {/* Global Monumental Footer */}
          <Footer />
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
