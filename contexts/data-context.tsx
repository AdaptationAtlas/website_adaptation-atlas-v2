'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import * as q from '@/lib/sanity.query'
import { useLanguageContext } from '@/contexts/language-context'

const SanityDataContext = createContext<any>(null)

export const useSanityData = () => useContext(SanityDataContext)

// context key -> query, each takes the locale
const queries = {
  homeContent: q.getHomeContent,
  aboutContent: q.getAboutContent,
  getInvolvedContent: q.getGetInvolvedContent,
  resourcesContent: q.getResourcesContent,
  spotlights: q.getSpotlights,
  insights: q.getInsights,
  impacts: q.getImpacts,
  primaryTags: q.getPrimaryTags,
  secondaryTags: q.getSecondaryTags,
  searchContent: q.getSearchContent,
  siteSettings: q.getSiteSettings,
}

export const SanityDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>({})
  const { locale } = useLanguageContext()

  useEffect(() => {
    Promise.all(
      Object.entries(queries).map(async ([key, fn]) => [key, await fn(locale)])
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
