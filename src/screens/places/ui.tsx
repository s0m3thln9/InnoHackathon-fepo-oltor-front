'use client'

import { Header } from '@/shared/ui/header'
import { useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Map } from '@/features/places'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const markers = [
  { lat: 52.4355, lng: 30.9554, title: 'Marker 1' },
  { lat: 52.4395, lng: 30.9954, title: 'Marker 2' },
]

const libs: Libraries = ['places']

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
    googleMapsApiKey: API_KEY ? API_KEY : '',
    libraries: libs,
  })

  return (
    <>
      <Header selectedItem='places' />
      <main className='h-full'>
        {isLoaded ? (
          <Map markers={markers} />
        ) : (
          <div className='h-full w-full flex items-center justify-center'>
            Loading
          </div>
        )}
      </main>
    </>
  )
}
