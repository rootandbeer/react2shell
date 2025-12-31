import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vulnerable React2Shell App',
  description: 'Educational lab for CVE-2025-55182 / CVE-2025-66478',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

