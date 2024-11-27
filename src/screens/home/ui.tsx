'use client'

import { Header } from '@/shared/ui/header'
import { useEffect } from 'react'
import { useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import image1 from '../../../public/images/foto.png'
import image2 from '../../../public/images/event.png'
import image3 from '../../../public/images/glass.png'
import Cookies from 'js-cookie'

export const HomePage = () => {
  const user = Cookies.get('user')
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])
  return (
    <div className='h-[100svh] flex flex-col'>
      <Header />
      <main className='flex flex-col items-center justify-center bg-background-secondary pt-16 h-full'>
        <div className='w-full flex justify-start bg-background-primary-linear-first'>
          <div className='text-[96px] text-text bg-background px-40 py-4 rounded-r-full font-medium'>
            FePo
          </div>
        </div>
        <div className='grid grid-cols-2 w-full h-full'>
          <div className='flex flex-col items-center justify-center'>
            <div className='text-4xl text-text-secondary w-1/2'>
              <div>
                With <span className='font-medium'>FePo,</span> event planning
                becomes easy!
              </div>
              <div className='pt-16'>
                We offer the best venues, top-notch services, and highly
                qualified professionals for your perfect event.
              </div>
            </div>
            <Button className='py-5 px-16 text-4xl mt-24'>
              click to start
            </Button>
          </div>
          <div className='grid grid-cols-2 gap-4 justify-self-end seld-end w-full bg-gradient-to-r from-background-secondary to-background'>
            <div className='col-span-1 row-span-1 justify-self-end self-end flex justify-end'>
              <Image
                src={image1}
                alt=''
                className='w-[90%]'
              />
            </div>
            <div className='col-span-1 row-span-2 justify-self-start self-center flex justify-start'>
              <Image
                src={image2}
                alt=''
                className='w-[90%]'
              />
            </div>
            <div className='col-span-1 row-span-1 justify-self-end self-start flex justify-end'>
              <Image
                src={image3}
                alt=''
                className='w-[90%]'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
