'use client'

import { Header } from '@/shared/ui/header'
import { useEffect, useState } from 'react'
import { Map } from '@/features/places'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'
import { useLoadUser } from '@/shared/hooks'

interface MarkerState {
  coordinates: {
    lat: number
    lng: number
  }
  categories: string[]
  dates: Date[]
  name: string
  rating: number
  period: string
  description: string
  image: Blob
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const libs: Libraries = ['places']

export const PlacesPage = () => {
  const [markers, setMarkers] = useState<MarkerState[]>()
  const { user, isUserLoaded } = useLoadUser()

  const loadMarkers = async () => {
    const response = await fetch('http://localhost:4000/places', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    console.log(result)
    return result.places
  }

  useEffect(() => {
    loadMarkers().then((r) => setMarkers(r))
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY ? API_KEY : '',
    libraries: libs,
  })

  if (!isUserLoaded && !user) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Header selectedItem='places' />
      <main className='h-full'>
        {isLoaded ? (
          <Map markers={markers} />
        ) : (
          <div className='h-full w-full flex items-center justify-center'>
            Loading...
          </div>
        )}
      </main>
    </>
  )
}
