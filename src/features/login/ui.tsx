'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FC } from 'react'
import { cn } from '@/shared/libs'

interface LoginFormValues {
  email: string
  password: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
})

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}

export const LoginForm: FC = () => {
  const handleSubmit = async (values: LoginFormValues) => {
    const data = {
      email: values.email,
      password: values.password,
    }
    const response = await fetch('http://localhost:80/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className='flex flex-col gap-5 max-sm:gap-3'>
          <div>
            <Field
              type='email'
              name='email'
              placeholder='Enter your email...'
              className={cn(
                'w-[420px] h-[56px] shadow-input-button placeholder-text-placeholder text-text-additional rounded-2xl px-4 outline-none max-2xl:h-12 max-2xl:w-96 max-sm:h-10 max-sm:w-80 max-sm:text-sm',
                touched.email && errors.email ? 'border-error border' : '',
              )}
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-error pl-1 pt-1'
            />
          </div>
          <div>
            <Field
              type='password'
              name='password'
              placeholder='Enter your password...'
              className={cn(
                'w-[420px] h-[56px] shadow-input-button placeholder-text-placeholder text-text-additional rounded-2xl px-4 outline-none max-2xl:h-12 max-2xl:w-96 max-sm:h-10 max-sm:w-80 max-sm:text-sm',
                touched.password && errors.password
                  ? 'border-error border'
                  : '',
              )}
            />
            <ErrorMessage
              name='password'
              component='div'
              className='text-error pl-1 pt-1'
            />
          </div>
          <button
            type='submit'
            className='flex shadow-input-button items-center justify-center bg-gradient-to-r from-[#7C4DFF] to-[#4A2E99] rounded-full text-text text-2xl px-5 py-2 self-center max-2xl:text-xl max-2xl:px-4 max-sm:px-3 max-sm:py-1 max-sm:text-lg'
          >
            log in to account
          </button>
        </Form>
      )}
    </Formik>
  )
}
