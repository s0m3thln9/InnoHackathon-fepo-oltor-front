'use client'

import { Header } from '@/shared/ui/header'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Map } from '@/features/places'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'
import Cookies from 'js-cookie'

interface MarkerState {
  coordinates: {
    lat: number
    lng: number
  }
  name: string
  rating: number
  period: string
  description: string
  image: string
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const libs: Libraries = ['places']

export const PlacesPage = () => {
  const user = Cookies.get('user')
  const router = useRouter()
  const [markers, setMarkers] = useState<MarkerState[]>()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])

  const loadMarkers = async () => {
    const response = await fetch('http://localhost:4000/places', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    const arrayResult = []
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        arrayResult.push(result[key])
      }
    }
    return arrayResult
  }

  useEffect(() => {
    loadMarkers().then((r) => setMarkers(r))
  }, [])

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
