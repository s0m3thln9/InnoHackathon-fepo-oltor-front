'use client'

import { Header } from '@/shared/ui/header'
import { Slide, Slider } from '@/widgets/home/slider'
import image1 from '../../../public/images/wedding_foto.png'
import image2 from '../../../public/images/bd_cake.png'
import image3 from '../../../public/images/corporativ_foto.png'
import image4 from '../../../public/images/ch_foto.png'
import image5 from '../../../public/images/bs_foto.png'
import image6 from '../../../public/images/other_foto.png'
import { useLoadUser } from '@/shared/hooks'
import { useRouter } from 'next/navigation'

const slides: Slide[] = [
  { img: image1, text: 'wedding' },
  { img: image2, text: 'birthday' },
  { img: image3, text: 'corporate party' },
  { img: image4, text: 'children`s party' },
  { img: image5, text: 'business meeting' },
  { img: image6, text: 'other event' },
]

export const EventsPage = () => {
  const router = useRouter()
  const { user, isUserLoaded } = useLoadUser()

  const handleClickAction = (text: string) => {
    if (sessionStorage.getItem('category') !== text) {
      sessionStorage.setItem('category', text)
    }
    router.push('/places')
  }

  if (!isUserLoaded && !user) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Header selectedItem='events' />
      <main className='flex flex-col items-center justify-center bg-gradient-to-b from-background-secondary-linear-first to-background-secondary-linear-second'>
        <h1 className='text-8xl text-text mt-8 max-2xl:text-7xl max-sm:text-6xl'>
          events
        </h1>
        <p className='text-2xl text-text-secondary mt-5 max-2xl:text-xl max-sm:text-lgl'>
          First, select the upcoming event
        </p>
        <Slider
          handleClickAction={handleClickAction}
          slides={slides}
          className='mt-24 max-lg:mt-8'
        />
      </main>
      <footer className='bg-background-secondary-linear-second h-full w-full'></footer>
    </>
  )
}
