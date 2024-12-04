'use client'

import { FC, useState } from 'react'
import * as Yup from 'yup'
import { CommonForm } from '@/shared/ui/form'
import { useRouter } from 'next/navigation'
import { Notification } from '@/shared/ui/notification'
import { useAppDispatch, useAppSelector } from '@/app/stores'
import { userSlice } from '@/entities/user'

export interface RegistrationFormValues {
  name: string
  email: string
  password: string
  repeatPassword: string
}

export interface Field {
  name: string
  type: string
  placeholder: string
}

interface RegistrationResult {
  status: boolean
  message: string
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
})

const initialValues: RegistrationFormValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
}

const fields: Field[] = [
  { name: 'name', type: 'text', placeholder: 'Enter your name...' },
  { name: 'email', type: 'email', placeholder: 'Enter your email...' },
  { name: 'password', type: 'password', placeholder: 'Enter your password...' },
  {
    name: 'repeatPassword',
    type: 'password',
    placeholder: 'Repeat your password...',
  },
]

export const RegistrationForm: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.user.error)
  const [notification, setNotification] = useState<boolean>(false)

  const handleClose = () => {
    setNotification(false)
  }

  const handleSubmit = async (values: RegistrationFormValues) => {
    const response = await fetch(
      'https://inno-hackathon-fepo-oltor-back.vercel.app/api/registration',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      },
    )
    const result: RegistrationResult = await response.json()
    if (result.status) {
      router.replace('/login')
    } else {
      dispatch(userSlice.actions.registerFailure(result.message))
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
        buttonText='Create Account'
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
