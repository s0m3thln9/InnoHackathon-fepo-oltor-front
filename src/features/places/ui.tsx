'use client'

import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'

export const Map = ({ center }) => {
  const mapRef = useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  return (
    <div className='w-full h-full'>
      <GoogleMap
        mapContainerClassName='w-full h-full'
        center={{ lat: 52.4345, lng: 30.9754 }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
    </div>
  )
}
