import { cn } from '@/shared/libs'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

interface MenuProps {
  selectedItem?: string
}

export const Menu: FC<MenuProps> = ({ selectedItem }) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 830)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 830)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuVisible(false)
      }
    }
    if (isMenuVisible) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuVisible])

  const handleClick = (category: string) => {
    router.push(`/${category}`)
    setIsMenuVisible(false)
  }

  const openMenu = () => {
    setIsMenuVisible(true)
  }

  if (!isMobile) {
    return (
      <nav className='flex gap-16 text-text max-lg:gap-6'>
        <div
          onClick={() => handleClick('events')}
          className={cn(
            'cursor-pointer',
            selectedItem === 'events' ? 'font-medium underline' : '',
          )}
        >
          events
        </div>
        <div
          onClick={() => handleClick('places')}
          className={cn(
            'cursor-pointer',
            selectedItem === 'places' ? 'font-medium underline' : '',
          )}
        >
          places
        </div>
        <div
          onClick={() => handleClick('people')}
          className={cn(
            'cursor-pointer',
            selectedItem === 'people' ? 'font-medium underline' : '',
          )}
        >
          people
        </div>
        <div
          onClick={() => handleClick('reviews')}
          className={cn(
            'cursor-pointer',
            selectedItem === 'reviews' ? 'font-medium underline' : '',
          )}
        >
          reviews
        </div>
      </nav>
    )
  } else {
    return (
      <div className='relative'>
        <div
          className='text-text cursor-pointer select-none'
          onClick={openMenu}
        >
          Links
        </div>
        {isMenuVisible && (
          <nav
            ref={menuRef}
            className='z-10 absolute top-8 left-1/2 -translate-x-1/2 w-fit flex flex-col gap-4 text-text bg-background-button-linear-first p-4 rounded-xl before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:border-x-transparent before:border-x-8 before:border-b-8 before:border-b-background-button-linear-first before:border-t-0'
          >
            <div
              onClick={() => handleClick('events')}
              className={cn(
                'cursor-pointer',
                selectedItem === 'events' ? 'font-medium underline' : '',
              )}
            >
              events
            </div>
            <div
              onClick={() => handleClick('places')}
              className={cn(
                'cursor-pointer',
                selectedItem === 'places' ? 'font-medium underline' : '',
              )}
            >
              places
            </div>
            <div
              onClick={() => handleClick('people')}
              className={cn(
                'cursor-pointer',
                selectedItem === 'people' ? 'font-medium underline' : '',
              )}
            >
              people
            </div>
            <div
              onClick={() => handleClick('reviews')}
              className={cn(
                'cursor-pointer',
                selectedItem === 'reviews' ? 'font-medium underline' : '',
              )}
            >
              reviews
            </div>
          </nav>
        )}
      </div>
    )
  }
}
