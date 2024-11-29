'use client'

import { Header } from '@/shared/ui/header'
import { useLoadUser } from '@/shared/hooks'
import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { PeopleSlider } from '@/widgets/people/slider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface Person {
  name: string
  description: string
  price: number
  image: Blob
  rating: number
  category: string
}

export const PeoplePage = () => {
  const [slides, setSlides] = useState<Person[]>([])
  const [likedPeople, setLikedPeople] = useState<Person[]>([])
  const { user, isUserLoaded } = useLoadUser()
  const router = useRouter()

  const place = JSON.parse(sessionStorage.getItem('place') as string)

  const loadPeople = async () => {
    const response = await fetch('http://localhost:4000/people', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    console.log(result)

    return result.people
  }

  const handleLikeClick = (person: Person) => {
    setLikedPeople((prev) => {
      if (prev.some((p) => p.name === person.name)) {
        return prev.filter((p) => p.name !== person.name)
      } else {
        return [...prev, person]
      }
    })
  }

  const handleFindOutClick = () => {
    sessionStorage.setItem('likedPeople', JSON.stringify(likedPeople))
    router.push('/total')
  }

  const handleBackClick = () => {
    sessionStorage.removeItem('place')
    router.push('/places')
  }

  useEffect(() => {
    loadPeople().then((r) => setSlides(r))
  }, [])

  if (!isUserLoaded && !user) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Header selectedItem='people' />
      <main className='relative flex flex-col h-full'>
        <div
          onClick={handleBackClick}
          className='cursor-pointer absolute w-[76px] h-[76px] bottom-10 left-10 z-20 bg-background-primary-linear-first rounded-full flex items-center justify-center max-sm:size-16 max-sm:bottom-5 max-sm:left-5'
        >
          <svg
            width='37'
            height='37'
            viewBox='0 0 37 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.7538 9.14209L5.39585 18.5L14.7538 27.8579M31.6042 18.5H5.65794'
              stroke='#422592'
              strokeWidth='3'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        {place ? (
          <div className='relative w-full bg-background flex items-center justify-start pt-4 pb-6 pl-8 overflow-hidden'>
            <div className='absolute top-0 right-0 h-full'>
              <svg
                width='100%'
                height='100%'
                viewBox='0 0 521 368'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M521 0H0C13.1518 48.0744 59.896 139.193 141.659 119.074C223.422 98.9545 277.138 154.146 293.776 184.257C317.227 225.317 333.706 306.615 212.013 303.331C90.3193 300.046 38.663 345.075 28.0465 368H521V0Z'
                  fill='url(#paint0_linear_156_117)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_156_117'
                    x1='260.5'
                    y1='0'
                    x2='260.5'
                    y2='368'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#512DA8' />
                    <stop
                      offset='1'
                      stopColor='#A68EE8'
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className='z-10 flex flex-col items-center gap-4 h-full'>
              <div className='text-text text-2xl'>{place.name}</div>
              <div className='h-[220px] w-[220px] overflow-hidden rounded-[30px] max-md:h-[180px] max-md:w-[180px]'>
                <Image
                  src={`data:image/jpeg;base64,${place.image}`}
                  width={220}
                  height={220}
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            <div className='z-10 pl-4 flex flex-col items-start justify-around h-full'>
              <div className='text-text w-1/3 pt-4 max-lg:text-sm max-xl:w-1/2 max-lg:w-full max-lg:pr-3'>
                {place.description}
              </div>
              <div className='flex gap-1 pl-5 max-md:pl-0'>
                {Array.from({ length: 5 }, (_, index) => {
                  const starIndex = index + 1
                  const fill = starIndex <= place.rating ? '#A68EE8' : 'none'
                  return (
                    <svg
                      key={index}
                      width='32'
                      height='32'
                      viewBox='0 0 33 33'
                      fill={fill}
                      xmlns='http://www.w3.org/2000/svg'
                      className='max-md:size-6 max-sm:size-5'
                    >
                      <path
                        d='M16.85 1.84108L21.8927 9.63615C22.1557 10.0426 22.5571 10.3399 23.0226 10.4729L31.8465 12.9936L26.1303 20.3811C25.8417 20.754 25.6942 21.2168 25.7138 21.6879L26.1036 31.0859L17.564 27.8223C17.1043 27.6466 16.5958 27.6466 16.1361 27.8223L7.59652 31.0859L7.98635 21.6879C8.00589 21.2168 7.85837 20.754 7.56983 20.3811L1.85357 12.9936L10.6775 10.4729C11.143 10.3399 11.5444 10.0426 11.8074 9.63616L16.85 1.84108Z'
                        stroke='#A68EE8'
                        strokeWidth='2'
                      />
                    </svg>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full flex items-center justify-center text-4xl text-text flex-grow bg-background-secondary'>
            You need to choose a place
          </div>
        )}
        <div className='w-full h-12 text-text text-2xl flex items-center justify-center bg-background-circles'>
          Do you want to hire staff?
        </div>
        <div className='relative bg-background-secondary flex flex-col items-center justify-between w-full flex-grow'>
          <div className='absolute top-0 right-0 w-4/5 max-2xl:w-[75%] max-xl:w-2/3 max-lg:w-1/2 max-md:w-[60%] max-sm:w-[65%] select-none cursor-pointer'>
            {slides.length > 0 ? (
              <PeopleSlider
                likedPeople={likedPeople}
                handleClickAction={handleLikeClick}
                slides={slides}
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                Loading...
              </div>
            )}
          </div>
          <div className='py-16 pl-20 rounded-bl-[85px] bg-background-primary-linear-first w-full max-md:pl-10 max-md:py-12 max-sm:p-4 max-sm:rounded-none'>
            <div className='text-text-secondary text-2xl w-40 max-md:text-xl max-sm:text-lg max-sm:w-32'>
              Available on the specified date and time:
            </div>
          </div>
          <Button
            onClick={handleFindOutClick}
            className='py-3 px-32 rounded-b-none rounded-t-[40px] max-2xl:px-20 max-sm:py-3 max-sm:px-5'
          >
            find out the price
          </Button>
        </div>
      </main>
    </>
  )
}
