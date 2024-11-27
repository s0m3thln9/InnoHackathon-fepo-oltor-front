'use client'

import { FC, useState } from 'react'
import * as Yup from 'yup'
import { CommonForm } from '@/shared/ui/form'
import { useRouter } from 'next/navigation'
import { Notification } from '@/shared/ui/notification'

export interface LoginFormValues {
  email: string
  password: string
}

export interface Field {
  name: string
  type: string
  placeholder: string
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

  const [notification, setNotification] = useState<{
    message: string
  } | null>(null)

  const handleClose = () => {
    setNotification(null)
  }

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = await response.json()
    result.message = 'Incorrect email or password'
    console.log(result)
    if (result.status) {
      router.replace('/')
    } else {
      setNotification({ message: result.message })
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
      {notification && (
        <Notification
          message={notification.message}
          onClose={handleClose}
        />
      )}
    </>
  )
}
