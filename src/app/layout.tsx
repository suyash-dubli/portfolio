// app/layout.tsx
import './globals.css'
import type { Metadata } from "next"; 

export const metadata: Metadata = {
  title: "Suyash Kumar Dubli - Portfolio",
  description: "Personal portfolio showcasing projects and skills",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-gray-900 text-white">
        
        <main className="p-6">
          {children}
        </main>

        <footer className="p-4 text-center text-sm text-gray-400">
        © 2025 Suyash Kumar Dubli. All rights reserved. | Built with Next.js & Tailwind CSS.
        </footer>
      </body>
    </html>
  )
}
