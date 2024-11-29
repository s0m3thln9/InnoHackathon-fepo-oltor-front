import { createPortal } from 'react-dom'
import { FC } from 'react'
import { Button } from '@/shared/ui/button'

type Props = {
  message: string
  onClose: () => void
}

export const Notification: FC<Props> = ({ message, onClose }) => {
  return createPortal(
    <div className='absolute top-0 left-0 h-[100svh] w-full flex justify-center items-center z-20 bg-black/50'>
      <div className='p-10 flex items-center justify-center flex-col gap-5 z-50 bg-background-secondary rounded border'>
        <span className='text-text-secondary text-xl'>{message}</span>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>,
    document.body,
  )
}
