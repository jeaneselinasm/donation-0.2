// app/layout.tsx
import './globals.css'
// import Script from 'next/script'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Bahtraku',
  description: 'Supporting Bible translation projects worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <head />
      <body className={inter.className}>{children}
      </body>
    </html>
  )
}