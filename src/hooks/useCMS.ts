import { useQuery } from '@tanstack/react-query';
import { cms } from '../lib/cms';
import { localData } from '../data/localData';
import type { CMSData } from '../types/cms';

export const useCMS = () => {
  const { data, isLoading, isError } = useQuery<CMSData>({
    queryKey: ['cms-data'],
    queryFn: () => cms.getData(),
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
