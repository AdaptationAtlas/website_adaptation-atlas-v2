import { Rule } from '@sanity/types'
import { defineType } from 'sanity'

const SuperIcon = () => <div>x<sup>2</sup></div>
const SuperDecorator = (props: any) => <sup>{props.children}</sup>

export default defineType({
  title: 'Content',
  name: 'contentPage',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: "Super", value: 'super', icon: SuperIcon, component: SuperDecorator },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto']
                })
              },
            ],
          },
        ],
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Underline', value: 'underline' },
                  { title: "Super", value: 'super', icon: SuperIcon, component: SuperDecorator },
                ],
                annotations: [],
              },
            },
          ],
        },
      ]
    },
    {
      type: 'gallery',
    }
  ],
})

