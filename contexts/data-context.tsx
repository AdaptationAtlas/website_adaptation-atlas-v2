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

// context key -> [english query, french query]
const queries = {
  homeContent: [getHomeContent, getHomeContentFr],
  aboutContent: [getAboutContent, getAboutContentFr],
  getInvolvedContent: [getGetInvolvedContent, getGetInvolvedContentFr],
  resourcesContent: [getResourcesContent, getResourcesContentFr],
  spotlights: [getSpotlights, getSpotlightsFr],
  insights: [getInsights, getInsightsFr],
  impacts: [getImpacts, getImpactsFr],
  primaryTags: [getPrimaryTags, getPrimaryTagsFr],
  secondaryTags: [getSecondaryTags, getSecondaryTagsFr],
  searchContent: [getSearchContent, getSearchContentFr],
  siteSettings: [getSiteSettings, getSiteSettingsFr],
}

export const SanityDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>({})
  const { locale } = useLanguageContext()

  useEffect(() => {
    const lang = locale === 'fr' ? 1 : 0
    Promise.all(
      Object.entries(queries).map(async ([key, fns]) => [key, await fns[lang]()])
    ).then((entries) => {
      const result = Object.fromEntries(entries)
      result.searchContent = result.searchContent.filter((item: any) => !item.comingSoon || !item.underMaintenance) // filter out coming soon items
      setData(result)
    })
  }, [locale])

  return (
    <SanityDataContext.Provider value={data}>
      {children}
    </SanityDataContext.Provider>
  )
}
