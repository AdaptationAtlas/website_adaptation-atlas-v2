import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity.env'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: 'f9u5sqi0v54o8htwu62ghbaw' }, // https://africa-adaptation-atlas.sanity.studio
})
