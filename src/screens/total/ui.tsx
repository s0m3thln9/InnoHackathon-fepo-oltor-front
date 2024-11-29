'use client'

import { Header } from '@/shared/ui/header'
import { useLoadUser } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { Person } from '@/screens/people/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/libs'
import { CustomMarker } from '@/features/places'
import { Notification } from '@/shared/ui/notification'

export const TotalPage = () => {
  const router = useRouter()
  const { user, isUserLoaded } = useLoadUser()
  const [likedPeople, setLikedPeople] = useState<Person[]>()
  const [place, setPlace] = useState<CustomMarker>()
  const category = sessionStorage.getItem('category')
  const date = sessionStorage.getItem('date')
  const numberOfPeople = sessionStorage.getItem('numberOfPeople')
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    setLikedPeople(JSON.parse(sessionStorage.getItem('likedPeople') as string))
    setPlace(JSON.parse(sessionStorage.getItem('place') as string))
  }, [])

  const handleReselect = () => {
    sessionStorage.removeItem('likedPeople')
    router.push('/people')
  }

  const handleRemovePlace = () => {
    setPlace(undefined)
    sessionStorage.removeItem('place')
  }

  const handleSend = () => {
    setNotification(true)
  }

  const handleRemove = (person: Person) => {
    setLikedPeople((prev) => {
      const updatedLikedPeople = prev?.filter((p) => p.name !== person.name)
      sessionStorage.setItem('likedPeople', JSON.stringify(updatedLikedPeople))
      return updatedLikedPeople
    })
  }

  if (!isUserLoaded && !user) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        Loading...
      </div>
    )
  }

  return (
    <>
      {notification && (
        <Notification
          message='Заказ успешно отправлен'
          onClose={() => setNotification(false)}
        />
      )}
      <Header selectedItem='total' />
      <main className='relative flex h-full w-full'>
        <div
          className={cn(
            'flex flex-col items-center justify-center bg-background-circles pl-20 pr-10',
            !place && 'w-full',
          )}
        >
          <div className='self-start text-4xl font-medium text-text max-2xl:text-3xl'>
            Your choice:
          </div>
          <div className='flex flex-col overflow-y-auto h-[65svh] mt-2'>
            {place ? (
              <div className='flex gap-2 flex-col items-start'>
                <div className='text-text text-2xl'>Place:</div>
                <div className='flex p-2 bg-gradient-to-l from-background to-background-secondary rounded-r-[20px]'>
                  <div className='w-[174px] h-[174px] rounded-r-[20px] overflow-hidden max-2xl:hidden'>
                    <Image
                      src={`data:image/jpeg;base64,${place.image}`}
                      width={174}
                      height={174}
                      className='w-full h-full object-cover'
                      alt={place.name}
                    />
                  </div>
                  <div className='pl-3 flex flex-col justify-around items-start'>
                    <div className='text-xl text-text'>{place.name}</div>
                    <div className='text-sm text-text-secondary w-[300px]'>
                      {place.description}
                    </div>
                    <div className='flex'>
                      {Array.from({ length: 5 }, (_, index) => {
                        const starIndex = index + 1
                        const fill =
                          starIndex <= place.rating ? '#422592' : 'none'
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
                  </div>
                  <div
                    onClick={handleRemovePlace}
                    className='flex justify-center items-center pl-14 pr-9 cursor-pointer'
                  >
                    <svg
                      width='68'
                      height='68'
                      viewBox='0 0 68 68'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11.3333 17.5H56.6667M25.5 8.5H42.5M28.3333 47.5V29.5M39.6667 47.5V29.5M43.9167 59.5H24.0833C20.9537 59.5 18.4167 56.8137 18.4167 53.5L17.123 20.6249C17.0559 18.9205 18.3428 17.5 19.9538 17.5H48.0462C49.6572 17.5 50.9441 18.9205 50.877 20.6249L49.5833 53.5C49.5833 56.8137 47.0463 59.5 43.9167 59.5Z'
                        stroke='#F9F5FF'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className='w-full h-full flex justify-center items-center text-4xl text-text'>
                You need to choose a place
              </div>
            )}
            {likedPeople &&
              likedPeople.map((person) => (
                <div
                  key={person.name}
                  className='flex gap-2 flex-col items-start'
                >
                  <div className='text-text text-2xl'>{person.category}:</div>
                  <div className='flex p-2 bg-gradient-to-l from-background to-background-secondary rounded-r-[20px]'>
                    <div className='w-[174px] h-[174px] rounded-r-[20px] overflow-hidden max-2xl:hidden'>
                      <Image
                        src={`data:image/jpeg;base64,${person.image}`}
                        width={174}
                        height={174}
                        className='w-full h-full object-cover'
                        alt={person.name}
                      />
                    </div>
                    <div className='pl-3 flex flex-col justify-around items-start'>
                      <div className='text-xl text-text'>{person.name}</div>
                      <div className='text-sm text-text-secondary w-[300px]'>
                        {person.description}
                      </div>
                      <div className='flex'>
                        {Array.from({ length: 5 }, (_, index) => {
                          const starIndex = index + 1
                          const fill =
                            starIndex <= person.rating ? '#422592' : 'none'
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
                    </div>
                    <div className='justify-self-center self-center pl-3 text-text'>
                      {person.price}$/hour
                    </div>
                    <div
                      onClick={() => handleRemove(person)}
                      className='flex justify-center items-center pl-14 pr-9 cursor-pointer'
                    >
                      <svg
                        width='68'
                        height='68'
                        viewBox='0 0 68 68'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M11.3333 17.5H56.6667M25.5 8.5H42.5M28.3333 47.5V29.5M39.6667 47.5V29.5M43.9167 59.5H24.0833C20.9537 59.5 18.4167 56.8137 18.4167 53.5L17.123 20.6249C17.0559 18.9205 18.3428 17.5 19.9538 17.5H48.0462C49.6572 17.5 50.9441 18.9205 50.877 20.6249L49.5833 53.5C49.5833 56.8137 47.0463 59.5 43.9167 59.5Z'
                          stroke='#F9F5FF'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Button
            onClick={handleReselect}
            className='mt-5 py-6 px-20 max-2xl:px-12 max-2xl:py-5'
          >
            reselect people
          </Button>
        </div>
        {place && (
          <div className='bg-background-primary-linear-first flex flex-col w-full items-center justify-center p-10 text-text-secondary text-xl gap-8'>
            <div className='text-4xl font-medium text-text-secondary'>
              Total:
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>date</div>
              <div>{date}</div>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>number of people at the event</div>
              <div>{numberOfPeople}</div>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>type of event</div>
              <div>{category}</div>
            </div>
            <div className='flex justify-between items-center w-full'>
              <div>event duration</div>
              <div>2 hour</div>
            </div>
            <div className='flex justify-between items-center w-full pt-20'>
              <div>final price</div>
              <div>
                {likedPeople?.reduce(
                  (acc, person) => acc + person.price * 2,
                  0,
                )}
                $
              </div>
            </div>
            <div
              onClick={handleSend}
              className='text-2xl font-medium pt-4 cursor-pointer'
            >
              send your order
            </div>
          </div>
        )}
      </main>
    </>
  )
}
