'use client'

import { FC, useState } from 'react'
import * as Yup from 'yup'
import { CommonForm } from '@/shared/ui/form'
import { useRouter } from 'next/navigation'
import { Notification } from '@/shared/ui/notification'
import { useAppDispatch, useAppSelector } from '@/app/stores'
import { userSlice } from '@/entities/user'
import Cookies from 'js-cookie'
import { json } from 'node:stream/consumers'

export interface LoginFormValues {
  email: string
  password: string
}

export interface Field {
  name: string
  type: string
  placeholder: string
}

interface LoginResult {
  status: boolean
  user: {
    email: string
    name: string
  } | null
  message: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
})

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

const fields: Field[] = [
  { name: 'email', type: 'email', placeholder: 'Enter your email...' },
  { name: 'password', type: 'password', placeholder: 'Enter your password...' },
]

export const LoginForm: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.user.error)
  const [notification, setNotification] = useState<boolean>(false)

  const handleClose = () => {
    setNotification(false)
  }

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    // const result: LoginResult = await response.json()
    const result = {
      status: true,
      user: { email: 'email', name: 'name' },
      message: '',
    }
    if (result.status) {
      if (result.user) {
        dispatch(userSlice.actions.loginSuccess(result.user))
        Cookies.set('user', JSON.stringify(result.user), { expires: 7 })
      }
      router.replace('/')
    } else {
      dispatch(userSlice.actions.loginFailure(result.message))
      setNotification(true)
    }
  }

  return (
    <>
      <CommonForm
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmitAction={handleSubmit}
        fields={fields}
        buttonText='Log In to Account'
      />
      {notification && error && (
        <Notification
          message={error}
          onClose={handleClose}
        />
      )}
    </>
  )
}
