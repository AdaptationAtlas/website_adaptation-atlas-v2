const secondaryTag = {
  name: 'secondaryTag',
  title: 'Secondary tags',
  type: 'document',
  fields: [
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
  ],
}

export default secondaryTag
