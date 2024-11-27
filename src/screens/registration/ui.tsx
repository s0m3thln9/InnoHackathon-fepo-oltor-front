import { RegistrationForm } from '@/features/registration'
import { FC } from 'react'
import Link from 'next/link'

export const RegistrationPage: FC = () => {
  return (
    <div className='relative flex h-[100svh] w-full items-center justify-center bg-background overflow-hidden'>
      <div className='w-[33vw] h-[33vw] absolute rounded-full bottom-0 left-0 -translate-x-1/3 translate-y-1/3 bg-background-circles max-2xl:w-[50vw] max-2xl:h-[50vw]'></div>
      <div className='w-[33vw] h-[33vw] absolute rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-background-circles max-2xl:w-[50vw] max-2xl:h-[50vw]'></div>
      <div className='flex shadow-registration flex-col rounded-3xl bg-background-form justify-center items-center gap-2 pt-2 z-10 max-sm:w-full max-sm:h-full max-sm:rounded-none'>
        <div className='text-5xl text-text font-medium max-2xl:text-4xl max-sm:text-3xl'>
          FePo
        </div>
        <div className='flex shadow-registration-additional flex-col rounded-3xl bg-gradient-to-b from-background-form-linear-first to-background-form-linear-second items-center gap-5 p-5 max-sm:gap-3 max-sm:p-3 max-sm:shadow-registration-sm'>
          <div className='text-2xl self-start pl-3 max-2xl:text-xl max-sm:text-lg'>
            registration
          </div>
          <RegistrationForm />
          <div className='text-2xl text-text-link cursor-pointer hover:underline max-2xl:text-xl max-sm:text-lg'>
            <Link href={'/login'}>login to account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
