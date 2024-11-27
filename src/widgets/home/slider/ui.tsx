import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import image1 from '../../../../public/images/wedding_foto.png'
import image2 from '../../../../public/images/bd_cake.png'
import image3 from '../../../../public/images/corporativ_foto.png'
import image4 from '../../../../public/images/ch_foto.png'

export const Slider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      className='w-full'
    >
      <SwiperSlide>
        <Image
          src={image1}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image2}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image3}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image4}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image4}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image4}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={image4}
          alt=''
          width={300}
          height={300}
        />
      </SwiperSlide>
    </Swiper>
  )
}
