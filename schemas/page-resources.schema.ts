import { defineType } from 'sanity'

export default defineType({
  name: 'resources',
  type: 'document',
  title: 'Resources',
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
    {
      name: 'videosSection',
      title: 'Videos',
      description: 'Optional section to feature one or more videos.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section description',
          type: 'text',
        },
        {
          name: 'videos',
          title: 'Videos',
          type: 'array',
          of: [
            {
              name: 'video',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Video title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Video description',
                  type: 'text',
                },
                {
                  name: 'embedCode',
                  title: 'Video embed code',
                  type: 'text',
                  description: 'Optional: paste the full embed code if you prefer to copy/paste.',
                },
                {
                  name: 'src',
                  title: 'Video URL (src)',
                  type: 'url',
                  description: 'The src value from the embed code or direct video URL.',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'height',
                  title: 'Video height (px)',
                  type: 'number',
                },
                {
                  name: 'width',
                  title: 'Video width (px)',
                  type: 'number',
                },
              ],
            }
          ],
        },
      ],
    },
  ],
})
