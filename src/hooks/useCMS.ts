import { useState, useEffect } from 'react';
import { cms } from '../lib/cms';
import type { CMSData } from '../types/cms';
import { localData } from '../data/localData';

export const useCMS = () => {
  const [data, setData] = useState<CMSData>(localData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await cms.getData();
        setData(result);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};
