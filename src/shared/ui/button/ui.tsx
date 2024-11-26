import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '@/shared/libs'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        'flex shadow-input-button items-center justify-center bg-gradient-to-r from-[#7C4DFF] to-[#4A2E99] rounded-full text-text text-2xl px-5 py-2 max-2xl:text-xl max-2xl:px-4 max-sm:px-3 max-sm:py-1 max-sm:text-lg',
        className,
      )}
    >
      {children}
    </button>
  )
}
