import { defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})