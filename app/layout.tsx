import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buildUrl } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconNextChat, IconSeparator } from '@/components/ui/icons'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'
import VrmViewer from '@/components/vrmViewer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'OpenAI Assistant File Search',
    template: `%s - OpenAI Assistant File Search`,
  },
  description: 'An OpenAI Assistant File Search chatbot built with Next.js.',
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
      <body className={cn('antialiased', inter.className)} style={{ backgroundImage: `url(${'/bg-c.png'})` }}>
        <Providers>
          <VrmViewer />
          <div className="flex flex-col">
            <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4 bg-white bg-opacity-50">
              <div className="flex items-center text-gray-800 font-bold text-2xl">AI Avatar Interaction</div>
              <div className="flex items-center justify-end space-x-2 border border-gray-400 text-black">
                <a
                  target="_blank"
                  href="https://github.com/talesmousinho/openai-assistant-file-search"
                  rel="noopener noreferrer"
                  className={cn('dark:bg-transparent', buttonVariants({ variant: 'outline' }))}
                >
                  <span className="hidden md:flex">Quiz</span>
                </a>
              </div>
            </header>

            <main className="flex flex-1 flex-col dark:bg-muted/50">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
