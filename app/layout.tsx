import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'
import VrmViewer from "@/components/vrmViewer";

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Avatar Interaction',
    template: ``,
  },
  description: 'AI Avatar ',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <VrmViewer />
        <Providers>
          <div className="flex flex-col">
          <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4">
              <div className="flex items-center text-white font-bold text-2xl">AI Avatar Interaction</div>
            </header>
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
