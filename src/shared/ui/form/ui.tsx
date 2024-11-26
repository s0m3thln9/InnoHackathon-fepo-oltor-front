'use client'

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { cn } from '@/shared/libs'
import { Button } from '@/shared/ui/button'

interface Field {
  name: string
  type: string
  placeholder: string
}

interface CommonFormProps<T> {
  initialValues: T
  validationSchema: Yup.AnyObject
  onSubmitAction: (values: T, formikHelpers: FormikHelpers<T>) => void
  fields: Field[]
  buttonText: string
}

export const CommonForm = <T extends object>({
  initialValues,
  validationSchema,
  onSubmitAction,
  fields,
  buttonText,
}: CommonFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitAction}
    >
      {({ errors, touched }) => (
        <Form className='flex flex-col gap-5 max-sm:gap-3'>
          {fields.map(({ name, type, placeholder }) => (
            <div key={name}>
              <Field
                type={type}
                name={name}
                placeholder={placeholder}
                className={cn(
                  'w-[420px] h-[56px] shadow-input-button placeholder-text-placeholder text-text-secondary rounded-2xl px-4 outline-none max-2xl:h-12 max-2xl:w-96 max-sm:h-10 max-sm:w-80 max-sm:text-sm',
                  touched[name as keyof T] && errors[name as keyof T]
                    ? 'border-error border'
                    : '',
                )}
              />
              <ErrorMessage
                name={name}
                component='div'
                className='text-error pl-1 pt-1'
              />
            </div>
          ))}
          <Button
            type='submit'
            className='self-center'
          >
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
