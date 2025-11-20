import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from '@/lib/sanity.env'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
// import { schema } from '@/schemas/sanity.schema'
import { BiCog } from 'react-icons/bi'
import { BiHome } from 'react-icons/bi'
import { BiUser } from 'react-icons/bi'
import { BiFile } from 'react-icons/bi'
import { BiTag } from 'react-icons/bi'
import { BiShapeCircle } from 'react-icons/bi';

import { type SchemaTypeDefinition } from 'sanity'
import { documentInternationalization } from '@sanity/document-internationalization'
import { i18n } from '@/i18n.config'

import home from './schemas/page-home.schema'
import about from './schemas/page-about.schema'
import getInvolved from './schemas/page-get-involved.schema'
import spotlightPost from './schemas/post-spotlight.schema'
import insightPost from './schemas/post-insight.schema'
import impactPost from './schemas/post-impact.schema'
import settings from './schemas/settings.schema'
import primaryTag from './schemas/tag-primary.schema'
import secondaryTag from './schemas/tag-secondary.schema'
import dataCard from './schemas/data-card.schema'
import contentText from './schemas/content-text.schema'
import contentPage from './schemas/content-page.schema'
import gallery from './schemas/gallery.schema'
import resources from './schemas/page-resources.schema'

const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, about, getInvolved, spotlightPost, insightPost, impactPost, settings, primaryTag, secondaryTag, dataCard, contentText, contentPage, gallery, resources],
}

export default defineConfig({
  name: 'ab-atlas',
  title: 'Africa Agriculture Adaptation Atlas',
  basePath: '/admin',
  apiVersion,
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Homepage
            S.listItem()
              .title('Homepage')
              .icon(BiHome)
              .child(
                S.editor()
                  .id('home')
                  .schemaType('home')
                  .documentId('home')
              ),
            // About page
            S.listItem()
              .title('About page')
              .icon(BiUser)
              .child(
                S.editor()
                  .id('about')
                  .schemaType('about')
                  .documentId('about')
              ),
            // Get involved page
            S.listItem()
              .title('Get involved page')
              .icon(BiShapeCircle)
              .child(
                S.editor()
                  .id('getInvolved')
                  .schemaType('getInvolved')
                  .documentId('getInvolved')
              ),
            // Resources page
            S.listItem()
              .title('Resouces page')
              .icon(BiFile)
              .child(
                S.editor()
                  .id('resources')
                  .schemaType('resources')
                  .documentId('resources')
              ),
            // Visual divider
            S.divider(),
            // Posts - these use orderable-document-list to order entries
            orderableDocumentListDeskItem({
              type: 'spotlight',
              title: 'Data Explorations',
              icon: BiFile,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'insight',
              title: 'Quick Reads',
              icon: BiFile,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'impact',
              title: 'Use Cases',
              icon: BiFile,
              S,
              context,
            }),
            // Visual divider
            S.divider(),
            // Primary tags
            S.listItem()
              .title('Primary tags')
              .icon(BiTag)
              .child(
                S.documentTypeList('primaryTag')
              ),
            // Secondary tags
            S.listItem()
              .title('Secondary tags')
              .icon(BiTag)
              .child(
                S.documentTypeList('secondaryTag')
              ),
            // Visual divider
            S.divider(),
            // Site settings
            S.listItem()
              .title('Settings')
              .icon(BiCog)
              .child(
                S.editor()
                  .id('settings')
                  .schemaType('settings')
                  .documentId('settings')
              ),
          ])
      }
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['home', 'about', 'resources', 'getInvolved', 'spotlight', 'insight', 'impact', 'primaryTag', 'secondaryTag', 'settings'],
      languageField: 'language',
    }),
  ],
})
