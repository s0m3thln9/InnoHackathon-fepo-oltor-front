import type { Metadata } from 'next'
import '@/app/styles/style.css'
import { Fredoka } from 'next/font/google'
import { ReactNode } from 'react'
import { MainProviders } from '@/app/providers'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500'],
})

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
    <MainProviders>
      <html
        lang='en'
        className={fredoka.className}
      >
        <body className={''}>{children}</body>
      </html>
    </MainProviders>
  )
}
