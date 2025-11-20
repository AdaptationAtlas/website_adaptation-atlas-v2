import { Metadata } from 'next'
import { siteTitle } from '@/lib/constants'
import ResourcesContent from '@/components/pages/resources-content'

export const metadata: Metadata = {
  title: `Resources | ${siteTitle}`,
}

export default async function Resources() {
  return (
    <ResourcesContent />
  )
}
