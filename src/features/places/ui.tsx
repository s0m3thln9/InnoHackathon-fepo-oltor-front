'use client'

import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import { FC, useCallback, useRef, useState } from 'react'

interface MapProps {
  markers?: {
    title: string
    lat: number
    lng: number
  }[]
}

const mapOptions = {
  disableDefaultUI: true,
  mapTypeControl: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
}

export const Map: FC<MapProps> = ({ markers }) => {
  const mapRef = useRef<google.maps.Map | undefined>(undefined)
  const [activeMarker, setActiveMarker] = useState<null | number>(null)
  const handleActiveMarker = (markerIndex: number | null) => {
    if (markerIndex === activeMarker) {
      return
    }
    setActiveMarker(markerIndex)
  }

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.setCenter({ lat: 52.4355, lng: 30.9554 })
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = undefined
  }, [])

  return (
    <div className='w-full h-full'>
      <GoogleMap
        center={{ lat: 52.4355, lng: 30.9554 }}
        zoom={13}
        mapContainerClassName='w-full h-full'
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onMouseOver={() => handleActiveMarker(index)}
              onMouseOut={() => handleActiveMarker(null)}
            >
              {activeMarker === index && (
                <InfoWindow
                  position={{ lat: marker.lat, lng: marker.lng }}
                  options={{ headerDisabled: true }}
                >
                  <div className='bg-white p-2 rounded-lg shadow-md'>
                    <div className='font-bold text-gray-800'>
                      {marker.title}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Additional content can go here
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
      </GoogleMap>
    </div>
  )
}
