// TODO - Import project id and dataset from .env file

const NEXT_PUBLIC_SANITY_PROJECT_ID = 'gukr2buh'
const NEXT_PUBLIC_SANITY_DATASET = 'production'

import { createClient } from '@sanity/client'

export const getClient = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  // useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  useCdn: true,
});
