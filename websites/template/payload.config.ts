import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';
import { de } from 'payload/i18n/de';
import { en } from 'payload/i18n/en';
import sharp from 'sharp';

import layoutsCollection from '@website/src/collections/layouts-collection';
import mediaCollection from '@website/src/collections/media-collection';
import pagesCollection from '@website/src/collections/pages-collection';
import usersCollection from '@website/src/collections/users-collection';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  collections: [
    usersCollection,
    layoutsCollection,
    pagesCollection,
    mediaCollection,
  ],
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
  admin: {
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
      prefillOnly: true,
    },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        },
      });
    }
  },
  sharp,
});
