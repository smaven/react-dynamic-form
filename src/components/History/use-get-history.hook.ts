import { useMemo } from 'react';
import { lStorage, StorageKey } from '@/lib/local-storage';

export function useGetHistory() {
  const responses = useMemo(() => {
    const r = lStorage.getItem(StorageKey.Responses) ?? [];
    return r.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  }, []);

  return { responses };
}
