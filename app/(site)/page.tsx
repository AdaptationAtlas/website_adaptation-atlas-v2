'use client'

import HomeHero from '@/components/home/home-hero'
import SpotlightGrid from '@/components/home/spotlight-grid'
import { useSanityData } from '@/contexts/data-context'
import RelatedInfo from '@/components/home/related-info'
import HowToUse from '@/components/home/how-to-use'

export default function Home() {
  const {
    homeContent,
    spotlights,
    primaryTags,
    searchContent,
    siteSettings,
  } = useSanityData()

  return (
    <div id='home' className='p-5'>
      {(homeContent && searchContent && siteSettings) && <HomeHero searchContent={searchContent} content={homeContent} settings={siteSettings} />}
      {(spotlights && primaryTags && homeContent) && <SpotlightGrid spotlights={spotlights} tags={primaryTags} homeContent={homeContent} />}
      {homeContent && <HowToUse homeContent={homeContent}/>}
      {homeContent && <RelatedInfo homeContent={homeContent}/>}
    </div>
  )
}
