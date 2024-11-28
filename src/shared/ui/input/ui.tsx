import { FC, InputHTMLAttributes } from 'react'
import { cn } from '@/shared/libs'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: FC<InputProps> = ({
  label,
  name,
  className,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className='flex justify-between items-center w-full'>
      <label
        className='text-text-secondary text-xl text-nowrap'
        htmlFor={name}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        className={cn(
          'bg-transparent outline-none text-background-secondary text-xl text-right placeholder-text-background-secondary ml-4',
          className,
        )}
        {...props}
        placeholder=''
      />
    </div>
  )
}
