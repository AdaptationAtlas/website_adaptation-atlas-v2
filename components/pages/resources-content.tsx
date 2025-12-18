'use client'

import { PortableText } from '@portabletext/react'
import { portableTextPage } from '@/components/sanity/portable-text-page'
import { useSanityData } from '@/contexts/data-context'
import { Page } from '@/types/sanity.types'
import ResourcesVideos from '@/components/pages/resources-videos'

const ResourcesContent = () => {
  const {
    resourcesContent
  } = useSanityData()

  if (!resourcesContent) return null

  const { title, content, videosSection } = resourcesContent as Page

  return (
    <div id='resources' className='p-5 mt-20 lg:mt-32'>
      <header className='max-w-[940px] mx-auto mb-16'>
        <h1 className='page-header'>{title}</h1>
      </header>
      <div id='page-content' className='mb-[100px] space-y-16'>
        {content && (
          <PortableText value={content} components={portableTextPage} />
        )}
        <ResourcesVideos videosSection={videosSection} />
      </div>
    </div>
  )
}

export default ResourcesContent
