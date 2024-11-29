'use client'

import React, { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import Image from 'next/image'
import { cn } from '@/shared/libs'

export interface Slide {
  name: string
  description: string
  price: number
  category: string
  image: Blob
  rating: number
}

interface SliderProps {
  className?: string
  slides: Slide[]
  handleClickAction: (slide: Slide) => void
  likedPeople: Slide[]
}

export const PeopleSlider: FC<SliderProps> = ({
  className,
  slides,
  handleClickAction,
  likedPeople,
}) => {
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
        <SwiperSlide key={slide.name}>
          <div className='relative flex flex-col text-text justify-start items-center w-[265px] bg-gradient-to-b from-background to-background-secondary pt-4 pl-4 pr-4'>
            <div className='self-start h-[48px]'>
              {slide.category + ' ' + slide.name}
            </div>
            <div className='text-sm h-[100px] truncate text-wrap'>
              {slide.description}
            </div>
            <div className='text-xl'>{slide.price}$</div>
            <div className='text-xl'>1 hour</div>
            <div className='w-[174px] h-[123px] rounded-[30px] overflow-hidden'>
              <Image
                src={`data:image/jpeg;base64,${slide.image}`}
                width={174}
                height={123}
                alt={slide.name}
                className='w-full h-full object-cover'
              />
            </div>

            <div
              onClick={() => handleClickAction(slide)}
              className='cursor-pointer'
            >
              <svg
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill={
                  likedPeople.some((person) => person.name === slide.name)
                    ? '#422592'
                    : 'none'
                }
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6.344 10.344C7.84422 8.84424 9.87869 8.00172 12 8.00172C14.1213 8.00172 16.1558 8.84424 17.656 10.344L20 12.686L22.344 10.344C23.082 9.57993 23.9647 8.97047 24.9408 8.5512C25.9168 8.13192 26.9665 7.91124 28.0288 7.902C29.091 7.89277 30.1445 8.09519 31.1276 8.49744C32.1108 8.89968 33.004 9.49371 33.7552 10.2448C34.5063 10.996 35.1003 11.8892 35.5026 12.8724C35.9048 13.8555 36.1072 14.909 36.098 15.9712C36.0888 17.0335 35.8681 18.0832 35.4488 19.0592C35.0295 20.0353 34.4201 20.918 33.656 21.656L20 35.314L6.344 21.656C4.84423 20.1558 4.00171 18.1213 4.00171 16C4.00171 13.8787 4.84423 11.8442 6.344 10.344V10.344Z'
                  stroke='#422592'
                  strokeWidth='2'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
