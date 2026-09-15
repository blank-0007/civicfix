import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ReportsProvider } from '@/lib/reports-store'
import { ToastProvider } from '@/components/toaster'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'CivicFix — Cleaner Cities. Healthier Communities.',
  description:
    'CivicFix is an AI-powered civic issue reporting platform. Report potholes, garbage, broken streetlights and more. AI classifies, prioritizes, and routes each issue to the right department.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <body className="font-sans antialiased">
        <ToastProvider>
          <ReportsProvider>{children}</ReportsProvider>
        </ToastProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
