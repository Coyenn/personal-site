import path from 'path'
import { en } from 'payload/i18n/en'
import { de } from 'payload/i18n/de'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'

import usersCollection from '@website/src/collections/users-collection'
import pagesCollection from '@website/src/collections/pages-collection'
import mediaCollection from '@website/src/collections/media-collection'
import layoutsCollection from '@website/src/collections/layouts-collection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  collections: [usersCollection, layoutsCollection, pagesCollection, mediaCollection],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  i18n: {
    supportedLanguages: { en, de },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.PAYLOAD_ADMIN_USER_EMAIL ?? 'dev@tim-ritter.com',
          password: process.env.PAYLOAD_ADMIN_USER_PASSWORD ?? 'dev',
        },
      })
    }
  },
  sharp,
})
