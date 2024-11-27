'use client'

import { FC, useState } from 'react'
import * as Yup from 'yup'
import { CommonForm } from '@/shared/ui/form'
import { useRouter } from 'next/navigation'
import { Notification } from '@/shared/ui/notification'

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

  const [notification, setNotification] = useState<{
    message: string
  } | null>(null)

  const handleClose = () => {
    setNotification(null)
  }

  const handleSubmit = async (values: RegistrationFormValues) => {
    const response = await fetch('http://localhost:4000/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = await response.json()

    if (result) {
      router.replace('/login')
    } else {
      setNotification({ message: 'Something went wrong' })
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
      {notification && (
        <Notification
          message={notification.message}
          onClose={handleClose}
        />
      )}
    </>
  )
}
