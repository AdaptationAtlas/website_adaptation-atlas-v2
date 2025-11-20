'use client'

import { PortableText } from '@portabletext/react'
import { portableTextPage } from '@/components/sanity/portable-text-page'
import { useSanityData } from '@/contexts/data-context'

const ResourcesContent = () => {
  const {
    resourcesContent
  } = useSanityData()

  if (resourcesContent) return (
    <div id='resources' className='p-5 mt-20 lg:mt-32'>
      <header className='max-w-[940px] mx-auto mb-16'>
        <h1 className='page-header'>{resourcesContent.title}</h1>
      </header>
      <div id='page-content' className='mb-[100px]'>
        <PortableText value={resourcesContent.content} components={portableTextPage} />
      </div>
    </div>
  )

  return null
}

export default ResourcesContent
