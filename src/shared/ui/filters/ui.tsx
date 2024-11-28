import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Toddler } from '@/shared/ui/toddler'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '@/app/stores'
import { filterSlice } from '@/entities/filter'

export const Filters = () => {
  const [dateFilter, setDateFilter] = useState<string | undefined>('')
  const [timeFilter, setTimeFilter] = useState<string | undefined>('')
  const [numberOfPeopleFilter, setNumberOfPeopleFilter] = useState(0)
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
  }

  return (
    <div className='absolute z-20 top-5 left-5 w-[340px]'>
      <div className='h-24 rounded-t-[50px] flex justify-start items-center bg-background-secondary w-full pl-4'>
        <div className='w-14 h-14 rounded-full flex justify-center items-center bg-background-primary-linear-first cursor-pointer'>
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
        <div className='text-text-secondary text-2xl pl-5'>Filters</div>
      </div>
      <div className='w-full bg-background-primary-linear-second rounded-b-[50px] p-5 pt-8 flex flex-col items-center gap-10'>
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
          Apply
        </Button>
      </div>
    </div>
  )
}
