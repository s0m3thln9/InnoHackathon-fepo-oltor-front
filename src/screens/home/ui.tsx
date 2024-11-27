'use client'

import { Header } from '@/shared/ui/header'
import { useEffect } from 'react'
import { useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'

export const HomePage = () => {
  const user = useAppSelector((state) => state.user.user)
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])
  return (
    <div className='h-[100svh] flex flex-col'>
      <Header />
      <main className='flex flex-col items-center justify-center bg-gradient-to-b from-background-main-linear-first to-background-main-linear-second'>
        <h1>Home</h1>
      </main>
      <footer className='bg-background-main-linear-second h-full w-full'></footer>
    </div>
  )
}
