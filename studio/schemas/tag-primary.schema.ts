import { Rule } from '@sanity/types'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const primaryTag = {
  name: 'primaryTag',
  title: 'Primary tags',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'primaryTag', newItemPosition: 'before' }),
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the tag. Changes to the tag name will be reflected wherever the tag appears on the site.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click "Generate" to automatically create a slug from the tag name.',
      options: { source: 'name' },
      validation: (rule: Rule) => rule.required(),
    },
  ],
}

export default primaryTag
