'use client'

import { Header } from '@/shared/ui/header'
import { Slide, Slider } from '@/widgets/home/slider'
import image1 from '../../../public/images/wedding_foto.png'
import image2 from '../../../public/images/bd_cake.png'
import image3 from '../../../public/images/corporativ_foto.png'
import image4 from '../../../public/images/ch_foto.png'
import image5 from '../../../public/images/bs_foto.png'
import image6 from '../../../public/images/other_foto.png'

const slides: Slide[] = [
  { img: image1, text: 'wedding' },
  { img: image2, text: 'birthday' },
  { img: image3, text: 'corporate party' },
  { img: image4, text: "children's party" },
  { img: image5, text: 'business meeting' },
  { img: image6, text: 'other event' },
]

export const EventsPage = () => {
  return (
    <div className='h-[100svh] flex flex-col'>
      <Header />
      <main className='flex flex-col items-center justify-center bg-gradient-to-b from-background-main-linear-first to-background-main-linear-second'>
        <h1 className='text-[96px] text-text mt-8'>events</h1>
        <p className='text-2xl text-text-secondary mt-5'>
          First, select the upcoming event
        </p>
        <Slider
          slides={slides}
          className='mt-24'
        />
      </main>
      <footer className='bg-background-main-linear-second h-full w-full'></footer>
    </div>
  )
}
