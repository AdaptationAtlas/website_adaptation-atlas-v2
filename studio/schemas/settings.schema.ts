import { defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Settings title',
      type: 'string',
      hidden: true
    },
    {
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
    },
    {
      name: 'localiztionEnabled',
      title: 'Enable localization',
      description: 'If checked, this will display the language selector dropdown.',
      type: 'boolean',
    },
    {
      name: 'logoDark',
      title: 'Logo image (homepage)',
      type: 'image',
      description: 'The main logo image used on the homepage and page headers.',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }
      ]
    },
    {
      name: 'logoLight',
      title: 'Logo image (menu)',
      type: 'image',
      description: 'The light-colored logo image used in the menu.',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }
      ]
    },
    {
      name: 'contentTypes',
      title: 'Content types',
      description: 'Content type labels for posts (used on menu and pages).',
      type: 'object',
      fields: [
        {
          name: 'spotlightsTitle',
          title: 'Data Explorations post type title',
          type: 'string',
        },
        {
          name: 'insightsTitle',
          title: 'Quick Reads post type title',
          type: 'string',
        },
        {
          name: 'impactsTitle',
          title: 'Use Cases post type title',
          type: 'string',
        },
      ]
    },
    {
      name: 'menu',
      title: 'Main menu',
      description: 'Content options for the main menu.',
      type: 'object',
      fields: [
        {
          name: 'workTitle',
          title: 'Our work menu title',
          type: 'string',
        },
        {
          name: 'aboutTitle',
          title: 'About menu title',
          type: 'string',
        },
        {
          name: 'aboutSlug',
          title: 'About menu slug',
          description: 'Must match slug on About page',
          type: 'string',
        },
        {
          name: 'getInvolvedTitle',
          title: 'Get involved menu title',
          type: 'string',
        },
        {
          name: 'getInvolvedSlug',
          title: 'Get involved menu slug',
          description: 'Must match slug on Get Involved page',
          type: 'string',
        },
        {
          name: 'resourcesTitle',
          title: 'Resources menu title',
          type: 'string',
        },
        {
          name: 'resourcesSlug',
          title: 'Resources menu slug',
          description: 'Must match slug on Resources page',
          type: 'string',
        },
      ]
    },
    {
      name: 'footer',
      title: 'Footer',
      description: 'Content options for the site footer and menu footer.',
      type: 'object',
      fields: [
        {
          name: 'mailingListLabel',
          title: 'Mailing list label',
          type: 'string',
        },
        {
          name: 'mailingListLink',
          title: 'Mailing list link',
          type: 'string',
        },
        {
          name: 'feedbackLabel',
          title: 'Feedback label',
          type: 'string',
        },
        {
          name: 'feedbackLink',
          title: 'Feedback link',
          type: 'string',
        },
        {
          name: 'contactLabel',
          title: 'Contact label',
          type: 'string',
        },
        {
          name: 'contactLink',
          title: 'Contact link',
          type: 'string',
        },
        {
          name: 'shareLabel',
          title: 'Share label',
          type: 'string',
        },
        {
          name: 'shareMessage',
          title: 'Share message',
          type: 'string',
        },
        {
          name: 'copyright',
          title: 'Copyright',
          type: 'string',
        },
      ]
    },
    {
      name: 'postOptions',
      title: 'Post options',
      description: 'Content options for posts.',
      type: 'object',
      fields: [
        {
          name: 'creditLabel',
          title: 'Image credit label',
          type: 'string',
        },
        {
          name: 'exploreLinkLabel',
          title: 'Explore link label',
          type: 'string',
        },
        {
          name: 'previewLabel',
          title: 'Interactive preview label',
          type: 'string',
        },
        {
          name: 'ctaLinkLabel',
          title: 'CTA link label',
          type: 'string',
        },
        {
          name: 'tagsTitle',
          title: 'Tags section title',
          type: 'string',
        },
        {
          name: 'relatedTitle',
          title: 'Related posts section title',
          type: 'string',
        },
        {
          name: 'methodsTitle',
          title: 'Methods section title',
          type: 'string',
        },
      ]
    },
    {
      name: 'options404',
      title: '404 page options',
      description: 'Content options for the 404 (page not found) page.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: '404 page title',
          type: 'string',
        },
        {
          name: 'linkLabel',
          title: 'Back link label',
          type: 'string',
        },
      ]
    },
  ],
})


