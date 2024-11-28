import { ChangeEvent, FC } from 'react'

interface ToddlerProps {
  value: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Toddler: FC<ToddlerProps> = ({ value, onChange }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-between text-text-secondary text-xl'>
        <div>2</div>
        <div>100</div>
      </div>
      <input
        type='range'
        min='2'
        max='100'
        value={value}
        onChange={onChange}
        className='w-full mt-3 h-1 bg-text-secondary rounded-full appearance-none cursor-pointer'
      />
    </div>
  )
}
