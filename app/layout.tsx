import type { Metadata } from 'next'
import '@/app/styles/style.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'FEPO',
  description: 'Project for hackathon',
}

export default function App({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={'bg-background'}>{children}</body>
    </html>
  )
}
