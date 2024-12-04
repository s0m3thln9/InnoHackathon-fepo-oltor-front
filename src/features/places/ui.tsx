'use client'

import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { Filters } from '@/shared/ui/filters/ui'
import { useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'

export interface CustomMarker {
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

interface MapProps {
  markers?: CustomMarker[]
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
  const [activeMarker, setActiveMarker] = useState<null | number>(null)
  const [filteredMarkers, setFilteredMarkers] = useState(markers)
  const mapRef = useRef<google.maps.Map | undefined>(undefined)
  const date = useAppSelector((state) => state.filter.date)
  const time = useAppSelector((state) => state.filter.time)
  const numberOfPeople = useAppSelector((state) => state.filter.numberOfPeople)
  const category = sessionStorage.getItem('category')
  const [isLike, setIsLike] = useState(false)
  const router = useRouter()

  const handleActiveMarker = (markerIndex: number | null) => {
    if (markerIndex === activeMarker) {
      return
    }
    setActiveMarker(markerIndex)
  }

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map
    mapRef.current?.setCenter({ lat: 52.4355, lng: 30.9554 })
  }, [])

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined
  }, [])

  const handleMapClick = useCallback(() => {
    if (activeMarker !== null) {
      setActiveMarker(null)
    }
  }, [activeMarker])

  const handleCardClick = (marker: CustomMarker) => {
    sessionStorage.setItem('place', JSON.stringify(marker))
    router.push('/people')
  }

  const handleLikeClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setIsLike(!isLike)
  }

  useEffect(() => {
    const filtered = markers?.filter((marker) => {
      console.log(category)
      console.log(marker.categories)
      const categoryMatch =
        category === undefined ||
        marker.categories?.includes(category as string)
      const dateMatch = date === undefined || marker.dates?.includes(date)
      const [startTime, endTime] = marker.period.split('-')
      const timeMatch =
        time === undefined || (time >= startTime && time <= endTime)
      const peopleMatch =
        numberOfPeople === undefined || marker.maxPeople >= numberOfPeople

      return categoryMatch && dateMatch && timeMatch && peopleMatch
    })

    setFilteredMarkers(filtered)
    console.log(filtered)
  }, [category, date, markers, numberOfPeople, time])

  return (
    <div className='w-full h-full relative'>
      <Filters />
      <GoogleMap
        zoom={13}
        mapContainerClassName='w-full h-full'
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {filteredMarkers &&
          filteredMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: marker.coordinates.lat,
                lng: marker.coordinates.lng,
              }}
              onClick={() => handleActiveMarker(index)}
            >
              {activeMarker === index && (
                <InfoWindow
                  options={{
                    headerDisabled: true,
                    pixelOffset: new window.google.maps.Size(120, 10),
                    disableAutoPan: true,
                  }}
                >
                  <div
                    onClick={() => handleCardClick(marker)}
                    className='cursor-pointer shadow-map-item relative bg-white rounded-3xl rounded-bl-none bg-gradient-to-b from-background to-background-secondary-linear-second w-56 pt-[70px] overflow-hidden'
                  >
                    <Image
                      src={`data:image/jpeg;base64,${marker.image}`}
                      width={224}
                      height={70}
                      alt=''
                      className='absolute top-0 left-0 w-56 h-[70px] object-cover'
                    />
                    <div className='text-2xl text-text pl-2'>{marker.name}</div>
                    <div className='text-sm text-text-secondary pl-2 leading-4 text-wrap'>
                      {marker.description}
                    </div>
                    <div className='text-sm text-text-secondary pl-2'>
                      {marker.period}
                    </div>
                    <div className='flex items-center gap-12 p-2'>
                      <div className='flex gap-1'>
                        {Array.from({ length: 5 }, (_, index) => {
                          const starIndex = index + 1
                          const fill =
                            starIndex <= marker.rating ? '#422592' : 'none'
                          return (
                            <svg
                              key={index}
                              width='18'
                              height='18'
                              viewBox='0 0 18 18'
                              fill={fill}
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M9 1.80875L11.4287 5.46918L12.1234 5.00824L11.4287 5.46918C11.6944 5.86971 12.0955 6.16114 12.5586 6.29011L16.7903 7.46877L14.0596 10.9097C13.7608 11.2862 13.6075 11.7577 13.628 12.238L13.8147 16.6269L9.69833 15.093C9.2479 14.9252 8.7521 14.9252 8.30168 15.093L4.18531 16.6269L4.37203 12.238C4.39246 11.7577 4.23924 11.2862 3.94044 10.9097L1.20966 7.46877L5.44143 6.29011C5.90448 6.16114 6.30559 5.86971 6.57134 5.46918L9 1.80875Z'
                                stroke='#422592'
                                strokeWidth='2'
                              />
                            </svg>
                          )
                        })}
                      </div>
                      <div
                        onClick={handleLikeClick}
                        className='cursor-pointer'
                      >
                        <svg
                          width='40'
                          height='40'
                          viewBox='0 0 40 40'
                          fill={isLike ? '#422592' : 'none'}
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M6.344 10.344C7.84422 8.84424 9.87869 8.00172 12 8.00172C14.1213 8.00172 16.1558 8.84424 17.656 10.344L20 12.686L22.344 10.344C23.082 9.57993 23.9647 8.97047 24.9408 8.5512C25.9168 8.13192 26.9665 7.91124 28.0288 7.902C29.091 7.89277 30.1445 8.09519 31.1276 8.49744C32.1108 8.89968 33.004 9.49371 33.7552 10.2448C34.5063 10.996 35.1003 11.8892 35.5026 12.8724C35.9048 13.8555 36.1072 14.909 36.098 15.9712C36.0888 17.0335 35.8681 18.0832 35.4488 19.0592C35.0295 20.0353 34.4201 20.918 33.656 21.656L20 35.314L6.344 21.656C4.84423 20.1558 4.00171 18.1213 4.00171 16C4.00171 13.8787 4.84423 11.8442 6.344 10.344V10.344Z'
                            stroke='#422592'
                            strokeWidth='2'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
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
