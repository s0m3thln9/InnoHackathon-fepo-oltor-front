'use client'

import React, { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/shared/libs'

export interface Slide {
  img: StaticImageData
  text: string
}

interface SliderProps {
  className?: string
  slides: Slide[]
}

export const Slider: FC<SliderProps> = ({ className, slides }) => {
  const [slidesCount, setSlidesCount] = useState(4)

  useEffect(() => {
    setSlidesCount(() => {
      if (window.innerWidth > 1150) {
        return 4
      } else if (window.innerWidth > 800) {
        return 3
      } else if (window.innerWidth > 520) {
        return 2
      } else {
        return 1
      }
    })
    const handleResize = () => {
      setSlidesCount(() => {
        if (window.innerWidth > 1150) {
          return 4
        } else if (window.innerWidth > 800) {
          return 3
        } else if (window.innerWidth > 520) {
          return 2
        } else {
          return 1
        }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Swiper
      slidesPerView={slidesCount}
      freeMode={true}
      className={cn('w-full select-none', className)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.text}>
          <div className='relative flex justify-center items-center'>
            <div className='bg-background w-fit rounded-[20px]'>
              <Image
                onClick={() => console.log(slide.img.src)}
                src={slide.img.src}
                alt={slide.img.src}
                width={slide.img.width}
                height={slide.img.height}
                className='justify-self-center opacity-70 cursor-pointer'
              />
            </div>
            <p className='absolute bottom-4 left-1/2 -translate-x-1/2 text-xl text-text drop-shadow-slider-text'>
              {slide.text}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
