import { useQuery } from '@tanstack/react-query';
import { cms } from '../lib/cms';
import { localData } from '../data/localData';
import type { CMSData } from '../types/cms';
import { sanityClient, isSanityConfigured } from '../lib/sanity';
import groq from 'groq';

export const useCMS = () => {
  const { data, isLoading, isError } = useQuery<CMSData>({
    queryKey: ['cms-data'],
    queryFn: async () => {
      // 1. Try Sanity if configured
      if (isSanityConfigured()) {
        try {
          const query = groq`{
            "hero": *[_type == "hero"][0],
            "about": *[_type == "about"][0],
            "contact": *[_type == "contact"][0],
            "projects": *[_type == "project"] | order(id asc),
            "posts": *[_type == "post"] | order(date desc),
            "experience": *[_type == "experience"] | order(id desc),
            "skills": {
              "technical": *[_type == "skill" && category == "technical"],
              "professional": *[_type == "skill" && category == "professional"]
            },
            "certifications": *[_type == "certification"]
          }`;
          
          const sanityData = await sanityClient.fetch(query);
          
          // Basic validation to ensure we got something back before returning
          if (sanityData && sanityData.hero) {
            return sanityData as CMSData;
          }
        } catch (error) {
          console.warn('Sanity fetch failed, falling back to local data:', error);
        }
      }

      // 2. Fallback to local/existing CMS logic
      return cms.getData();
    },
    initialData: localData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return { 
    data: data || localData, 
    loading: isLoading,
    isError 
  };
};
