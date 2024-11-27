import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import Image, { StaticImageData } from 'next/image'
import image1 from '../../../../public/images/wedding_foto.png'
import image2 from '../../../../public/images/bd_cake.png'
import image3 from '../../../../public/images/corporativ_foto.png'
import image4 from '../../../../public/images/ch_foto.png'
import image5 from '../../../../public/images/bs_foto.png'
import image6 from '../../../../public/images/other_foto.png'
import { cn } from '@/shared/libs'

interface SliderProps {
  className?: string
}

const slides: StaticImageData[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
]

export const Slider: FC<SliderProps> = ({ className }) => {
  return (
    <Swiper
      slidesPerView={4}
      freeMode={true}
      className={cn('w-full select-none', className)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.src}>
          <Image
            src={slide.src}
            alt={slide.src}
            width={slide.width}
            height={slide.height}
            className='justify-self-center opacity-70'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
