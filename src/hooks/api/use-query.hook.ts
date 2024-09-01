import { useEffect, useState } from 'react';

// Would be better to use a library like SWR or Tanstack Query which already
// provides this functionality and more.

export function useQuery<T, U>(queryFn: (data?: T) => Promise<U>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<U | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    queryFn()
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
