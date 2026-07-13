import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeContext'
import LightLeakBackground from '@/components/LightLeakBackground'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={exposure.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-zinc-800 selection:text-white transition-colors duration-500">
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
          
        </ThemeProvider>
      </body>
    </html>
  )
}
