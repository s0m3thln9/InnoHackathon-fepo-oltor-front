'use client'

import { Header } from '@/shared/ui/header'
import { Slider } from '@/widgets/home/slider'

export const EventsPage = () => {
  return (
    <div className='h-[100svh] flex flex-col'>
      <Header />
      <main className='flex flex-col items-center justify-center bg-gradient-to-b from-background-main-linear-first to-background-main-linear-second'>
        <h1 className='text-[96px] text-text mt-8'>events</h1>
        <p className='text-2xl text-text-secondary mt-5'>
          First, select the upcoming event
        </p>
        <Slider className='mt-24' />
      </main>
      <footer className='bg-background-main-linear-second h-full w-full'></footer>
    </div>
  )
}
