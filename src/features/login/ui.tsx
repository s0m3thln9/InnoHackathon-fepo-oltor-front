'use client'

import { FC } from 'react'
import * as Yup from 'yup'
import { CommonForm } from '@/shared/ui/form'

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
  const handleSubmit = async (values: LoginFormValues) => {
    const response = await fetch('http://localhost:80/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const result = await response.json()
    console.log(result)
  }

  return (
    <CommonForm
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmitAction={handleSubmit}
      fields={fields}
      buttonText='Log In to Account'
    />
  )
}
