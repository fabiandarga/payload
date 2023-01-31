import { buildConfig } from 'payload/config';
import path from 'path';
import { Categories, Users, Restaurants, Media, Additives } from './collections';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { seed } from './seed';

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region : process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  serverURL: 'http://localhost:4000',
  cors: '*',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Restaurants,
    Categories,
    Additives,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  onInit: async (payload) => {
    if (process.env.PAYLOAD_SEED) {
      await seed(payload);
    }
  },
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: adapter, 
        },
      },
    }),
  ],
});
