'use client'

import { Header } from '@/shared/ui/header'
import { useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Map } from '@/features/places'
import { useJsApiLoader } from '@react-google-maps/api'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const PlacesPage = () => {
  // const user = useAppSelector((state) => state.user.user)
  // const router = useRouter()
  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/login')
  //   }
  // }, [router, user])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  })

  return (
    <>
      <Header selectedItem='places' />
      <main className='h-full'>{isLoaded ? <Map /> : <div>Loading</div>}</main>
    </>
  )
}
