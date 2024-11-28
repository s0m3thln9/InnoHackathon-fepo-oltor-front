'use client'

import { Header } from '@/shared/ui/header'
import { Button } from '@/shared/ui/button'
import { useLoadUser } from '@/shared/hooks'

export const HomePage = () => {
  const { user, isUserLoaded } = useLoadUser()

  if (!isUserLoaded && !user) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        Loading...
      </div>
    )
  }
  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center bg-background-secondary pt-16 h-full'>
        <div className='w-full flex justify-start bg-background-primary-linear-first'>
          <div className='text-8xl text-text bg-background-circles px-40 py-4 rounded-r-full font-medium max-2xl:text-7xl max-md:rounded-none max-md:w-full max-md:text-center max-md:px-0 max-sm:text-6xl'>
            FePo
          </div>
        </div>
        <div className='flex w-full h-full items-center justify-start bg-gradient-to-r from-background-secondary to-background relative overflow-hidden'>
          <div className='absolute top-0 left-0'>
            <svg
              className='max-lg:w-[120%] max-lg:h-[120%] max-md:w-[200%] max-md:h-[200%] max-sm:w-[300%] max-sm:h-[300%]'
              width='1300'
              height='1053'
              viewBox='0 0 1300 1053'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1299.5 558.928C1299.5 754.499 958.22 993.529 770.656 734.306C593.72 435.483 587.988 749.077 560.26 786.984C609.426 818.81 697.087 904.677 654.395 993.529C611.704 1082.38 489.781 1056.23 437.044 1009.98C212.004 1011.31 2.19424 908.175 116.518 545.784C130.944 495.609 106.719 430.928 87.72 404.796C-38.882 230.661 -110.491 -146.109 472.924 60.1975C610 108.67 657.622 152.642 656.907 212.919C644.053 337.357 658.852 479.742 880.592 255.309C1102.33 30.8756 1299.5 445.928 1299.5 558.928Z'
                fill='url(#paint0_linear_129_40)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_129_40'
                  x1='512.027'
                  y1='1071.76'
                  x2='643.348'
                  y2='68.3138'
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
          <div className='flex flex-col items-center justify-center w-1/2 pl-24 z-10 max-xl:w-2/3 max-lg max-lg:w-full max-lg:px-8'>
            <div className='text-4xl text-text-secondary max-2xl:text-3xl max-sm:text-2xl'>
              <div>
                With <span className='font-medium'>FePo,</span> event planning
                becomes easy!
              </div>
              <div className='pt-16'>
                We offer the best venues, top-notch services, and highly
                qualified professionals for your perfect event.
              </div>
            </div>
            <Button className='py-5 px-16 text-4xl mt-24 max-2xl:mt-20 max-2xl:text-3xl max-sm:text-2xl'>
              click to start
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
