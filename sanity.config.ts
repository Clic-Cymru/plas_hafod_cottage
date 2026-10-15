import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/cms/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'plas-hafod-cottage',
  title: 'Plas Hafod Cottage Management',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
