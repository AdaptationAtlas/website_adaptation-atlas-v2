import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { Home, Page, Spotlight, Impact, Insight, Tag, SearchItem, Settings } from '@/types/sanity.types'

// GROQ filter for the requested language. English docs are anything not tagged 'fr'.
const inLang = (locale: string) => (locale === 'fr' ? "language == 'fr'" : "language != 'fr'")

// Every query revalidates on the same schedule
const fetch = <T>(query: string, params = {}) =>
  getClient.fetch<T>(query, params, { next: { revalidate: 60 } })

const tagFields = groq`{
  _id,
  name,
  slug,
}`

const tags = groq`
  'featuredTags': tags.featured[]->${tagFields},
  'primaryTags': tags.primary[]->${tagFields},
  'secondaryTags': tags.secondary[]->${tagFields},
`

const relatedPosts = groq`
  'relatedPosts': relatedPosts[]->{
    _id,
    _type,
    title,
    'slug': slug.current,
  },
`

// Homepage content
export const getHomeContent = (locale: string) =>
  fetch<Home>(groq`*[_type == 'home' && ${inLang(locale)}][0] {
    _id,
    _createdAt,
    title,
    introText,
    subTitle,
    'slug': slug.current,
    ctaText,
    heroImage,
    'heroImage': heroImage.asset->url,
    'heroImageAlt': heroImage.asset->alt,
    search,
    spotlightCarousel,
    pageHeaders,
    howToUse,
    relatedInfo,
    'tout': {
      ...tout,
      'featuredImage': tout.featuredImage.asset->url,
      'featuredImageAlt': tout.featuredImage.alt
    },
  }`)

// Simple page content (about, get involved)
const getPage = (type: string, locale: string) =>
  fetch<Page>(groq`*[_type == '${type}' && ${inLang(locale)}][0] {
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    content,
  }`)

export const getAboutContent = (locale: string) => getPage('about', locale)
export const getGetInvolvedContent = (locale: string) => getPage('getInvolved', locale)

// Resources page content
export const getResourcesContent = (locale: string) =>
  fetch<Page>(groq`*[_type == 'resources' && ${inLang(locale)}][0] {
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    introContent,
    content,
    videosSection {
      title,
      description,
      videos[] {
        title,
        description,
        embedCode,
        src,
        height,
        width,
      }
    },
  }`)

// Data spotlights
export const getSpotlights = (locale: string) =>
  fetch<Spotlight[]>(groq`*[_type == 'spotlight' && ${inLang(locale)}]|order(orderRank) {
    _id,
    _createdAt,
    title,
    content,
    'comingSoon': comingSoon,
    'underMaintenance': underMaintenance,
    'prototype': prototype,
    'carousel': carousel,
    'slug': slug.current,
    'featuredImage': featuredImage.asset->url,
    'featuredImageAlt': featuredImage.asset->alt,
    ${tags}
    url,
  }`)

// Search content
export const getSearchContent = (locale: string) =>
  fetch<SearchItem[]>(groq`*[_type in ['spotlight', 'insight', 'impact'] && ${inLang(locale)}]|order(orderRank) {
    _id,
    _type,
    title,
    'comingSoon': comingSoon,
    'underMaintenance': underMaintenance,
    'prototype': prototype,
    'slug': slug.current,
    content,
    ${tags}
  }`)

// Post listings (insights, impacts)
const getPosts = <T>(type: string, locale: string) =>
  fetch<T[]>(groq`*[_type == '${type}' && ${inLang(locale)}]|order(orderRank) {
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    'featuredImage': featuredImage.asset->url,
    'featuredImageAlt': featuredImage.asset->alt,
  }`)

export const getInsights = (locale: string) => getPosts<Insight>('insight', locale)
export const getImpacts = (locale: string) => getPosts<Impact>('impact', locale)

// Single spotlight post
export const getSpotlightPost = (slug: string) =>
  fetch<Spotlight>(groq`*[_type == 'spotlight' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    'prototype': prototype,
    'slug': slug.current,
    'featuredImage': featuredImage.asset->url,
    'featuredImageAlt': featuredImage.asset->alt,
    'featuredImageCredit': featuredImage.credit,
    url,
    content,
    'dataCard': {
      ...dataCard,
      'featuredImage': dataCard.image.asset->url,
      'featuredImageAlt': dataCard.image.alt
    },
    ${tags}
    ${relatedPosts}
  }`, { slug })

// Single data insight post
export const getInsightPost = (slug: string) =>
  fetch<Insight>(groq`*[_type == 'insight' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    'featuredImage': featuredImage.asset->url,
    'featuredImageAlt': featuredImage.asset->alt,
    content,
    methods,
    ${relatedPosts}
  }`, { slug })

// Single data in practice (impact) post
export const getImpactPost = (slug: string) =>
  fetch<Impact>(groq`*[_type == 'impact' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    'slug': slug.current,
    'featuredImage': featuredImage.asset->url,
    'featuredImageAlt': featuredImage.asset->alt,
    content,
    ${relatedPosts}
  }`, { slug })

// Tags
const getTags = (type: string, locale: string) =>
  fetch<Tag[]>(groq`*[_type == '${type}' && ${inLang(locale)}]|order(orderRank) {
    _id,
    _createdAt,
    name,
    'slug': slug.current,
  }`)

export const getPrimaryTags = (locale: string) => getTags('primaryTag', locale)
export const getSecondaryTags = (locale: string) => getTags('secondaryTag', locale)

// Site settings. English needs [1] instead of [0] for reasons nobody has tracked down.
export const getSiteSettings = (locale: string) =>
  fetch<Settings>(groq`*[_type == 'settings' && ${inLang(locale)}][${locale === 'fr' ? 0 : 1}] {
    siteTitle,
    localiztionEnabled,
    'logoDark': logoDark.asset->url,
    'logoDarkAlt': logoDark.asset->alt,
    'logoLight': logoLight.asset->url,
    'logoLightAlt': logoLight.asset->alt,
    menu,
    contentTypes,
    footer,
    postOptions,
    options404,
  }`)
