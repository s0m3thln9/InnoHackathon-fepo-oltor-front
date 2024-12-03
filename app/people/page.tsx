'use client'

import dynamic from 'next/dynamic'

const DynamicPage = dynamic(
  () => import('@/screens/people').then((mod) => mod.PeoplePage),
  { ssr: false },
)
export default DynamicPage
