import { groq } from 'next-sanity'
import { getClient } from './sanity.client'
import { Home, Page, Spotlight, Impact, Insight, Tag, SearchItem, Settings } from '@/types/sanity.types'

// Homepage content
export async function getHomeContent(): Promise<Home> {
  return getClient.fetch(
    groq`*[_type == 'home' && language != 'fr'][0] {
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
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Homepage content
export async function getHomeContentFr(): Promise<Home> {
  return getClient.fetch(
    groq`*[_type == 'home' && language == 'fr'][0] {
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
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// About page content
export async function getAboutContent(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'about' && language != 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// About page content French
export async function getAboutContentFr(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'about' && language == 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get involved page content
export async function getGetInvolvedContent(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'getInvolved' && language != 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get involved page content French
export async function getGetInvolvedContentFr(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'getInvolved' && language == 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Data spotlights
export async function getSpotlights(): Promise<Spotlight[]> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      content,
      'comingSoon': comingSoon,
      'underMaintenance': underMaintenance,
      'upvotes': upvotes,
      'carousel': carousel,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Data spotlights French
export async function getSpotlightsFr(): Promise<Spotlight[]> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && language == 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      content,
      'comingSoon': comingSoon,
      'underMaintenance': underMaintenance,
      'upvotes': upvotes,
      'carousel': carousel,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get search content
export async function getSearchContent(): Promise<SearchItem[]> {
  return getClient.fetch(
    groq`*[_type in ['spotlight', 'insight', 'impact'] && language != 'fr']|order(orderRank) {
      _id,
      _type,
      title,
      'comingSoon': comingSoon,
      'underMaintenance': underMaintenance,
      'slug': slug.current,
      content,
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get search content in French
export async function getSearchContentFr(): Promise<SearchItem[]> {
  return getClient.fetch(
    groq`*[_type in ['spotlight', 'insight', 'impact'] && language == 'fr']|order(orderRank) {
      _id,
      _type,
      title,
      'comingSoon': comingSoon,
      'underMaintenance': underMaintenance,
      'slug': slug.current,
      content,
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get all data insights posts
export async function getInsights(): Promise<Insight[]> {
  return getClient.fetch(
    groq`*[_type == 'insight' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get all data insights posts in French
export async function getInsightsFr(): Promise<Insight[]> {
  return getClient.fetch(
    groq`*[_type == 'insight' && language == 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get all data in practice (impact) posts
export async function getImpacts(): Promise<Impact[]> {
  return getClient.fetch(
    groq`*[_type == 'impact' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Get all data in practice (impact) posts in French
export async function getImpactsFr(): Promise<Impact[]> {
  return getClient.fetch(
    groq`*[_type == 'impact' && language == 'fr']|order(orderRank) {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Function for getting a single spotlight post
export async function getSpotlightPost(slug: string): Promise<Spotlight> {
  return getClient.fetch(
    groq`*[_type == 'spotlight' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
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
      'featuredTags': tags.featured[]->{
        _id,
        name,
        slug,
      },
      'primaryTags': tags.primary[]->{
        _id,
        name,
        slug,
      },
      'secondaryTags': tags.secondary[]->{
        _id,
        name,
        slug,
      },
      'relatedPosts': relatedPosts[]->{
        _id,
        _type,
        title,
        'slug': slug.current,
      },
    }`,
    { slug },
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Function for getting a single data insight post
export async function getInsightPost(slug: string): Promise<Insight> {
  return getClient.fetch(
    groq`*[_type == 'insight' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      content,
      methods,
      'relatedPosts': relatedPosts[]->{
        _id,
        _type,
        title,
        'slug': slug.current,
      },
    }`,
    { slug },
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Function for getting a single data in practice (impact) post
export async function getImpactPost(slug: string): Promise<Impact> {
  return getClient.fetch(
    groq`*[_type == 'impact' && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      'featuredImage': featuredImage.asset->url,
      'featuredImageAlt': featuredImage.asset->alt,
      content,
      'relatedPosts': relatedPosts[]->{
        _id,
        _type,
        title,
        'slug': slug.current,
      },
    }`,
    { slug },
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Primary tags
export async function getPrimaryTags(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'primaryTag' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Primary tags
export async function getPrimaryTagsFr(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'primaryTag' && language == 'fr']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Secondary tags
export async function getSecondaryTags(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'secondaryTag' && language != 'fr']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Secondary tags French
export async function getSecondaryTagsFr(): Promise<Tag[]> {
  return getClient.fetch(
    groq`*[_type == 'secondaryTag' && language == 'fr']|order(orderRank) {
      _id,
      _createdAt,
      name,
      'slug': slug.current,
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Site settings
export async function getSiteSettings(): Promise<Settings> {
  return getClient.fetch(
    // For some reason, need to specify [1] here instead of [0]
    groq`*[_type == 'settings' && language != 'fr'][1] {
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
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Site settings French
export async function getSiteSettingsFr(): Promise<Settings> {
  return getClient.fetch(
    groq`*[_type == 'settings' && language == 'fr'][0] {
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
    }`,
    {},
    {
      next: {
        revalidate: 60 // look for updates to revalidate cache every minute
      }
    }
  )
}

// Resources page content
export async function getResourcesContent(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'resources' && language != 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60
      }
    }
  )
}

// Resources page content French
export async function getResourcesContentFr(): Promise<Page> {
  return getClient.fetch(
    groq`*[_type == 'resources' && language == 'fr'][0] {
      _id,
      _createdAt,
      title,
      'slug': slug.current,
      content,
    }`,
    {},
    {
      next: {
        revalidate: 60
      }
    }
  )
}
