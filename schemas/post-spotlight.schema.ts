import { Rule } from '@sanity/types'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const spotlightPost = {
  name: 'spotlight',
  title: 'Data Explorations',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "spotlight", newItemPosition: "before" }),
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
      description: 'Provide a concise and descriptive title for the data exploration. This title will appear in the data exploration page header and the data exploration gallery on the homepage.',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" to automatically create a slug from the page title or write a custom slug separated by hyphens. This will appear in the URL for this page.',
      options: { source: 'title' },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'comingSoon',
      title: 'Coming Soon',
      description: 'Check this box if the data exploration is coming soon. This can be used to indicate upcoming content.',
      type: 'boolean',
    },
    {
      name: 'underMaintenance',
      title: 'Under Maintenance',
      description: 'Check this box if the data exploration is under maintenance. This can be used to indicate that the data exploration is not available for time being.',
      type: 'boolean',
    },
    {
      name: 'prototype',
      title: 'Prototype',
      description: 'Check this box if the data exploration is live but still experimental. This keeps the link active while showing a prototype badge inviting feedback.',
      type: 'boolean',
    },
    {
      name: 'upvotes',
      title: 'Upvotes',
      description: 'This field is controlled by the user. Appears if "Coming Soon" is marked true.',
      type: 'number',
      initialValue: 0, // Default to zero
      // hidden: true,
    },    
    {
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      description: 'This is the main image for the data exploration. Please choose a high-quality image with a central focus point. This image will be used in the data exploration page header and the data exploration gallery on the homepage.',
      options: { hotspot: true },
      validation: (rule: Rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          description: 'Provide a concise description of the image for SEO and accessibility purposes.',
        },
        {
          name: 'credit',
          title: 'Credit',
          type: 'string',
          description: 'Provide an optional image credit.',
        },
      ]
    },
    {
      title: 'Observable Notebook URL',
      name: 'url',
      type: 'url',
      description: 'Include an external link to the related Observable Notebook.',
    },
    {
      name: 'content',
      title: 'Content',
      description: 'Use this rich text input to edit titles, body text and images on the page.',
      type: 'contentText',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'dataCard',
      type: 'dataCard',
    },
    {
      name: 'tags',
      title: 'Tags',
      description: 'Choose primary and secondary tags related to this data exploration.',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'primaryTag' }] }],
          description: 'Select up to three featured tags for this data exploration. These will appear below the data exploration thumbnail on the homepage.',
          validation: (rule: Rule) => rule.max(3), // Enforces three maximum featured tags
        },
        {
          name: 'primary',
          title: 'Primary tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'primaryTag' }] }],
          description: 'Select primary tags for this data exploration. Primary tags appear on the homepage and data exploration detail page.',
        },
        {
          name: 'secondary',
          title: 'Secondary tags',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'secondaryTag' }] }],
          description: 'Select secondary tags for this data exploration. Secondary tags only appear on the data exploration detail page.',
        },
      ]
    },
    {
      name: 'carousel',
      title: 'Carousel content',
      description: 'Provide a title and description to use for this data exploration to be used on the homepage feature carousel.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Carousel title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Carousel description',
          type: 'text',
        },
      ]
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

export default spotlightPost
