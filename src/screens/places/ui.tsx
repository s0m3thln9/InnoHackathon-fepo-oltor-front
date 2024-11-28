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
  dates: string[]
  name: string
  rating: number
  period: string
  description: string
  image: Blob
  maxPeople: number
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const libs: Libraries = ['places']

export const PlacesPage = () => {
  const [markers, setMarkers] = useState<MarkerState[]>()
  const { user, isUserLoaded } = useLoadUser()

  const loadMarkers = async () => {
    // const response = await fetch('http://localhost:4000/places', {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // })
    // const result = await response.json()
    const result = {
      places: [
        {
          coordinates: {
            lat: 52.4369,
            lng: 30.9578,
          },
          name: 'first',
          categories: ['first', 'second'],
          dates: ['2024-11-29', '2024-11-30'],
          rating: 4,
          period: '11:00-21:00',
          description: 'first description',
          image: new Blob(),
          maxPeople: 40,
        },
        {
          coordinates: {
            lat: 52.4399,
            lng: 30.9599,
          },
          name: 'second',
          categories: ['first', 'second'],
          dates: ['2024-11-30', '2024-12-01'],
          rating: 3,
          period: '08:00-22:00',
          description: 'second description',
          image: new Blob(),
          maxPeople: 20,
        },
      ],
    }

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
