import {defineType} from 'sanity'

export default defineType({
  name: 'dataCard',
  title: 'Data card',
  description: 'A graphic with title and description. The graphic may either be a still image or an iframe embed copied from Observable.',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Data card title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Data card description',
      type: 'text',
    },
    {
      name: 'observable',
      title: 'Observable iframe embed',
      description: 'Export the iframe embed code from Observable with your selected charts and provide it here. If an embed is provided, this will be used instead of an image.',
      type: 'object',
      fields: [
        {
          name: 'embedCode',
          title: 'Iframe embed code',
          type: 'text',
          description: 'The full embed code copied from the Observable notebook.',
        },
        {
          name: 'src',
          title: 'Iframe embed src',
          type: 'string',
          description: 'The src property of the iframe as it appears in the embed code.',
        },
        {
          name: 'height',
          title: 'Iframe height',
          type: 'number',
          description: 'The height property of the iframe as it appears in the embed code.',
        }
      ]
    },
    {
      name: 'image',
      title: 'Data card image',
      description: 'A static graphic or screenshot. Will be disregarded if an embed is provided.',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }
      ]
    },
  ]
})
