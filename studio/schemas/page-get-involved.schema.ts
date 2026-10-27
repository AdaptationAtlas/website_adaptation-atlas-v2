import { defineType } from 'sanity'

export default defineType({
  name: 'getInvolved',
  type: 'document',
  title: 'Get Involved',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Page title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'Click "Generate" to automatically create a slug from the page title or write a custom slug separated by hyphens. This will appear in the URL for this page.',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'content',
      title: 'Content',
      description: 'Use this rich text input to edit titles, body text and images on the page.',
      type: 'contentPage',
    },
  ],
})


