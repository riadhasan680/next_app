import './globals.css'
import type { Metadata } from 'next'
import AppToaster from './toaster'

export const metadata: Metadata = {
  title: 'Secure Auth App',
  description: 'Token-only login with Next.js, Tailwind, TypeScript'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
        <AppToaster />
      </body>
    </html>
  )
}