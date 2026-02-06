import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Content Repurposer',
  description: 'Transform your blog posts and YouTube transcripts into social media content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gray-50`}>
          {children}
          <Toaster theme="dark" position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
