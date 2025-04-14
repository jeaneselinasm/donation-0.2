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
  params
}: {
  children: React.ReactNode,
  params: { locale: string };
}) {
  return (
    <html lang={params.locale || 'en'  }>
      <head />
      <body className={inter.className}>{children}
      {/* <Script
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
  strategy="afterInteractive"
/> */}
      </body>
    </html>
  )
}