import { Rule } from '@sanity/types'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

const insightPost = {
  name: 'insight',
  title: 'Quick Reads',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'insight', newItemPosition: 'before' }),
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Provide a concise and descriptive title for the post. This title will appear in the post header and the gallery on the homepage.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" to automatically create a slug from the post title or write a custom slug separated by hyphens. This will appear in the URL for this page.',
      options: { source: 'title' },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      description: 'This is the main image for the post. This image will be used in the post header and the gallery on the homepage.',
      options: { hotspot: true },
      validation: (rule: Rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Provide a concise description of the image for SEO and accessibility purposes.',
        }
      ]
    },
    {
      name: 'content',
      title: 'Content',
      description: 'Use this rich text input to edit titles, body text and images on the page.',
      type: 'contentText',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'methods',
      title: 'Methods',
      description: 'Provide the methods content for this post. This content will appear at the bottom of the post in a two-column layout. Please do not use images.',
      type: 'contentText',
    },
    {
      name: 'relatedPosts',
      title: 'Related posts',
      description: 'Select up to five posts to feature in the "related posts" section below the content on the page.',
      type: 'array',
      of: [{
        type: 'reference', to: [
          { type: 'spotlight' },
          { type: 'insight' },
          { type: 'impact' },
        ]
      }],
      validation: (rule: Rule) => rule.max(5), // Enforces five maximum related posts
    },
  ]
}

export default insightPost