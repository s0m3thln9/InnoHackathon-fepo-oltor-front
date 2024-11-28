import { useAppDispatch, useAppSelector } from '@/app/stores'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { userSlice } from '@/entities/user'

export const useLoadUser = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const router = useRouter()
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  useEffect(() => {
    const userCookie = Cookies.get('user')
    if (userCookie) {
      const parsedUser = JSON.parse(userCookie)
      dispatch(userSlice.actions.loadUser(parsedUser))
    }
    setIsUserLoaded(true)
  }, [dispatch])

  useEffect(() => {
    if (!user && isUserLoaded) {
      console.log(user)
      router.replace('/login')
    }
  }, [router, user, isUserLoaded])

  return { user, isUserLoaded }
}
