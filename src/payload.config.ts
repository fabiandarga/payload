import { buildConfig } from 'payload/config';
import path from 'path';
import { Categories, Users, Restaurants, Media, Additives } from './collections';

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
});
