'use client'

import dynamic from 'next/dynamic'

const DynamicPage = dynamic(
  () => import('@/screens/total').then((mod) => mod.TotalPage),
  { ssr: false },
)

export default DynamicPage
