'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  getHomeContent,
  getHomeContentFr,
  getAboutContent,
  getAboutContentFr,
  getGetInvolvedContent,
  getGetInvolvedContentFr,
  getSpotlights,
  getSpotlightsFr,
  getInsights,
  getInsightsFr,
  getImpacts,
  getImpactsFr,
  getPrimaryTags,
  getPrimaryTagsFr,
  getSecondaryTags,
  getSecondaryTagsFr,
  getSearchContent,
  getSearchContentFr,
  getSiteSettings,
  getSiteSettingsFr,
  getResourcesContent,
  getResourcesContentFr,
} from '@/lib/sanity.query'
import { useLanguageContext } from '@/contexts/language-context'

const SanityDataContext = createContext<any>(null)

export const useSanityData = () => useContext(SanityDataContext)

interface DataProviderProps {
  children: ReactNode // This type ensures that children can be anything that React can render
}

export const SanityDataProvider = ({ children }: DataProviderProps) => {
  const [homeContent, setHomeContent] = useState<any>(null)
  const [aboutContent, setAboutContent] = useState<any>(null)
  const [getInvolvedContent, setGetInvovedContent] = useState<any>(null)
  const [spotlights, setSpotlights] = useState<any>(null)
  const [primaryTags, setPrimaryTags] = useState<any>(null)
  const [secondaryTags, setSecondaryTags] = useState<any>(null)
  const [insights, setInsights] = useState<any>(null)
  const [impacts, setImpacts] = useState<any>(null)
  const [searchContent, setSearchContent] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const [resourcesContent, setResourcesContent] = useState<any>(null)
  const { locale } = useLanguageContext()

  useEffect(() => {
    const fetchData = async () => {
      const home = (locale === 'fr') ? await getHomeContentFr() : await getHomeContent()
      const about = (locale === 'fr') ? await getAboutContentFr() : await getAboutContent()
      const getInvolved = (locale === 'fr') ? await getGetInvolvedContentFr() : await getGetInvolvedContent()
      const resources = (locale === 'fr') ? await getResourcesContentFr() : await getResourcesContent()
      const spots = (locale === 'fr') ? await getSpotlightsFr() : await getSpotlights()
      const insight = (locale === 'fr') ? await getInsightsFr() : await getInsights()
      const impact = (locale === 'fr') ? await getImpactsFr() : await getImpacts()
      const primaryTags = (locale === 'fr') ? await getPrimaryTagsFr() : await getPrimaryTags()
      const secondaryTags = (locale === 'fr') ? await getSecondaryTagsFr() : await getSecondaryTags()
      const search = (locale === 'fr') ? await getSearchContentFr() : await getSearchContent()
      const settings = (locale === 'fr') ? await getSiteSettingsFr() : await getSiteSettings()
      const filteredSearch = search.filter(item => !item.comingSoon || !item.underMaintenance) // filter out coming soon items

      setHomeContent(home)
      setAboutContent(about)
      setGetInvovedContent(getInvolved)
      setResourcesContent(resources)
      setSpotlights(spots)
      setInsights(insight)
      setImpacts(impact)
      setPrimaryTags(primaryTags)
      setSecondaryTags(secondaryTags)
      setSearchContent(filteredSearch)
      setSiteSettings(settings)
    }

    fetchData()
  }, [locale])

  return (
    <SanityDataContext.Provider value={{ homeContent, aboutContent, getInvolvedContent, resourcesContent, spotlights, insights, impacts, primaryTags, secondaryTags, searchContent, siteSettings }}>
      {children}
    </SanityDataContext.Provider>
  )
}
