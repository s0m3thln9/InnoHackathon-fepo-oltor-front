'use client'

import { Provider } from 'react-redux'
import { FC, ReactNode } from 'react'
import { mainStore } from '@/app/stores'

interface Props {
  children: ReactNode
}

export const MainProviders: FC<Props> = ({ children }) => (
  <Provider store={mainStore}>{children}</Provider>
)
