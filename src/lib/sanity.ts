import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return !!projectId;
};

// Create client only if projectId exists, otherwise return a dummy client
export const sanityClient = (isSanityConfigured() 
  ? createClient({
      projectId,
      dataset,
      useCdn: true, // set to `false` to bypass the edge cache
      apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    })
  : {
      fetch: async () => {
        console.warn('Sanity is not configured. Returning empty data.');
        return null;
      }
    }) as SanityClient;

