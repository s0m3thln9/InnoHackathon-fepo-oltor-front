import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Toddler } from '@/shared/ui/toddler'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/app/stores'
import { filterSlice } from '@/entities/filter'
import { cn } from '@/shared/libs'

export const Filters = () => {
  const [dateFilter, setDateFilter] = useState<string | undefined>('')
  const [timeFilter, setTimeFilter] = useState<string | undefined>('')
  const [numberOfPeopleFilter, setNumberOfPeopleFilter] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const onChangePeople = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeopleFilter(+event.target.value)
  }

  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFilter(event.target.value)
  }

  const onChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeFilter(event.target.value)
  }

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = () => {
    const date = dateFilter ? dateFilter : undefined
    const time = timeFilter ? timeFilter : undefined
    const numberOfPeople = numberOfPeopleFilter
    dispatch(
      filterSlice.actions.setFilter({
        date,
        time,
        numberOfPeople,
      }),
    )
    sessionStorage.setItem('date', date ? date : '')
    sessionStorage.setItem('numberOfPeople', numberOfPeople.toString())
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={divRef}
      className='absolute z-20 top-5 left-5 w-[340px] select-none'
    >
      <div
        className={cn(
          'h-24 flex items-center',
          isOpen
            ? 'rounded-t-[50px] w-full bg-background-secondary justify-start pl-5'
            : 'rounded-[50px] w-24 bg-background justify-center',
        )}
      >
        <div
          onClick={onClick}
          className='w-14 h-14 rounded-full flex justify-center items-center bg-background-primary-linear-first cursor-pointer'
        >
          <svg
            width='32'
            height='32'
            viewBox='0 0 33 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.70001 5.4L16.5 5.4M1.70001 16.5H16.5M16.5 16.5V20.2M16.5 16.5V12.8M1.70001 27.6H9.10001M16.5 27.6L31.3 27.6M23.9 16.5H31.3M23.9 5.4L31.3 5.4M23.9 5.4V9.1M23.9 5.4V1.7M10.025 31.3V23.9'
              stroke='#422592'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div
          className={cn(
            'text-text-secondary text-2xl pl-5',
            isOpen ? '' : 'hidden',
          )}
        >
          Filters
        </div>
      </div>
      <div
        className={cn(
          'w-full bg-background-primary-linear-second rounded-b-[50px] p-5 pt-8 flex flex-col items-center gap-10',
          isOpen ? '' : 'hidden',
        )}
      >
        <Input
          label='select date'
          name='date'
          type='date'
          value={dateFilter}
          onChange={onChangeDate}
        />
        <Input
          label='select time'
          name='time'
          type='time'
          value={timeFilter}
          onChange={onChangeTime}
        />
        <Input
          label='select number of people'
          name='people'
          type='number'
          className='w-12'
          value={numberOfPeopleFilter}
          onChange={onChangePeople}
        />
        <Toddler
          value={numberOfPeopleFilter}
          onChange={onChangePeople}
        />
        <Button
          onClick={onSubmit}
          className='bg-background-secondary px-16'
        >
          apply
        </Button>
      </div>
    </div>
  )
}
