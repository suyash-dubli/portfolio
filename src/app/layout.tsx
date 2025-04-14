// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* <header className="p-4 bg-gray-800 text-xl font-bold">My Portfolio</header> */}

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
