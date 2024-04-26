import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { vercelBlobAdapter } from '@payloadcms/plugin-cloud-storage/vercelBlob';
import {
  lexicalEditor,
  BlocksFeature,
  type FeatureProviderServer,
} from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';
import { en } from 'payload/i18n/en';
import { CodeBlock } from '@repo/custom-richtext-blocks';
import sharp from 'sharp';

import mediaCollection from '@website/src/collections/media-collection';
import pagesCollection from '@website/src/collections/pages-collection';
import usersCollection from '@website/src/collections/users-collection';
import projectsCollection from '@website/src/collections/projects-collection';
import blogPostsCollection from '@website/src/collections/blog-posts-collection';
import craftItemsCollection from '@website/src/collections/craft-items-collection';
import inspirationItemsCollection from '@website/src/collections/inspiration-items-collection';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [CodeBlock],
      }) as FeatureProviderServer<unknown, unknown>,
    ],
  }),
  collections: [
    usersCollection,
    pagesCollection,
    mediaCollection,
    projectsCollection,
    blogPostsCollection,
    craftItemsCollection,
    inspirationItemsCollection,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  i18n: {
    supportedLanguages: { en },
  },
  plugins: [
    cloudStorage({
      enabled: process.env.NODE_ENV === 'production',
      collections: {
        [mediaCollection.slug]: {
          adapter: vercelBlobAdapter({
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
          }),
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: process.env.PAYLOAD_ADMIN_USER_EMAIL ?? 'dev@tim-ritter.com',
          password: process.env.PAYLOAD_ADMIN_USER_PASSWORD ?? 'dev',
        },
      });
    }
  },
  sharp,
});
