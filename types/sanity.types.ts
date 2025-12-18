import { PortableTextBlock } from 'sanity'

export type RelatedPost = {
  _id: string
  _type: string
  title: string
  slug: string
}

export type Tag = {
  _id: string
  _createdAt: Date
  name: string
  slug: string
}

type Observable = {
  embedCode: string
  src: string
  height: number
}

export type DataCard = {
  title: string
  description: string
  observable: Observable
  featuredImage: string
  featuredImageAlt: string
}

type Tout = {
  _id: string
  _createdAt: Date
  title: string
  subtitle: string
  featuredImage: string
  featuredImageAlt: string
  descriptionHeader: string
  descriptionBody: string
  buttonLabel: string
}

type Search = {
  menuTitle: string
  title: string
  placeholder: string
  placeholderShort: string
  noResultsMessage: string
}

type SpotlightCarousel = {
  kicker: string
  buttonLabel: string
  counterLabel: string
}

type PageHeaders = {
  spotlightTitle: string
  spotlightSubtitle: string
  filterLabel: string
  searchPlaceholder: string
  noResultsMessage: string
  comingSoonLabel: string
  underMaintenanceLabel: string
  upvoteLabel: string
  notifyMeLabel: string
  notifyMeLink: string
  insightTitle: string
  insightSubtitle: string
  impactTitle: string
  impactSubtitle: string
}

export type Home = {
  subTitle: any
  _id: string
  _createdAt: Date
  title: string
  slug: string
  introText: string
  ctaText: string
  heroImage: string;
  heroImageAlt: string;
  search: Search
  spotlightCarousel: SpotlightCarousel
  pageHeaders: PageHeaders
  howToUse: HowToVideo
  relatedInfo: RelatedInfo
  tout: Tout
}

export type Video = {
  embedCode?: string
  src: string
  height?: number
  width?: number
}

export type HowToVideo = {
  title: string
  description: string
  video: Video
}

export type ResourceVideo = Video & {
  title?: string
  description?: string
}

export type VideosSection = {
  title?: string
  description?: string
  videos?: ResourceVideo[]
}

export type RelatedInfo = {
  title: string,
  title1: string,
  content1: PortableTextBlock[],
  title2: string,
  content2: PortableTextBlock[],
  title3: string,
  content3: PortableTextBlock[],
  title4: string, 
  content4: PortableTextBlock[]
}

export type Page = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  content: PortableTextBlock[]
  videosSection?: VideosSection
}

type Carousel = {
  title: string
  description: string
}

export type SearchItem = {
  _id: string
  _type: string
  title: string
  slug: string
  featuredTags: Tag[]
  primaryTags: Tag[]
  secondaryTags: Tag[]
  content: PortableTextBlock[]
  comingSoon?: boolean
  underMaintenance?: boolean
}

export type Spotlight = {
  _id: string
  _createdAt: Date
  title: string
  comingSoon: boolean
  underMaintenance: boolean
  upvotes: number
  slug: string
  featuredImage: string
  featuredImageAlt: string
  featuredImageCredit: string
  url: string
  carousel: Carousel
  featuredTags: Tag[]
  primaryTags: Tag[]
  secondaryTags: Tag[]
  content: PortableTextBlock[]
  dataCard: DataCard
  relatedPosts: RelatedPost[]
}

export type Insight = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  content: PortableTextBlock[]
  methods: PortableTextBlock[]
  relatedPosts: RelatedPost[]
}

export type Impact = {
  _id: string
  _createdAt: Date
  title: string
  slug: string
  featuredImage: string
  featuredImageAlt: string
  content: PortableTextBlock[]
  relatedPosts: RelatedPost[]
}

type Menu = {
  workTitle: string
  aboutTitle: string
  aboutSlug: string
  getInvolvedTitle: string
  getInvolvedSlug: string
}

type ContentTypes = {
  spotlightsTitle: string
  insightsTitle: string
  impactsTitle: string
}

type Footer = {
  mailingListLabel: string
  mailingListLink: string
  feedbackLabel: string
  feedbackLink: string
  contactLabel: string
  contactLink: string
  shareLabel: string
  shareMessage: string
  copyright: string
}

type PostOptions = {
  creditLabel: string
  exploreLinkLabel: string
  previewLabel: string
  ctaLinkLabel: string
  tagsTitle: string
  relatedTitle: string
  methodsTitle: string
}

type Options404 = {
  title: string
  linkLabel: string
}

export type Settings = {
  siteTitle: string
  localiztionEnabled: boolean
  logoDark: string
  logoDarkAlt: string
  logoLight: string
  logoLightAlt: string
  contentTypes: ContentTypes
  menu: Menu
  footer: Footer
  postOptions: PostOptions
  options404: Options404
}
