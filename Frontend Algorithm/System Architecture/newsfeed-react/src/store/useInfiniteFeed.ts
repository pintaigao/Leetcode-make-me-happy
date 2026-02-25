import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeedPage } from '../api/newsfeed';

function computeDynamicLimit(): number {
  // Rough heuristic: one post ~ 180px tall on average.
  const approxPostHeight = 180;
  const screen = typeof window !== 'undefined' ? window.innerHeight : 900;
  const base = Math.ceil(screen / approxPostHeight);
  return Math.min(25, Math.max(8, base + 6));
}

export function useInfiniteFeed() {
  const [limit, setLimit] = useState<number>(10);
  const lastSuccessfulFetchAt = useRef<number | null>(null);
  
  useEffect(() => {
    // After first render, we can tune the limit to the viewport.
    setLimit(computeDynamicLimit());
  }, []);
  
  const query = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({pageParam}) => fetchFeedPage({cursor: pageParam ?? null, limit}),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
  
  useEffect(() => {
    if (query.isSuccess) {
      lastSuccessfulFetchAt.current = Date.now()
    }
  }, [query.isSuccess, query.dataUpdatedAt]);
  
  const posts = useMemo(() => {
    return query.data?.pages.flatMap((p) => p.posts) ?? [];
  }, [query.data]);
  
  const isStale = useMemo(() => {
    const t = lastSuccessfulFetchAt.current;
    if (!t) return false;
    return Date.now() - t > 2 * 60 * 60 * 1000; // 2 hours
  }, [query.dataUpdatedAt]);
  
  return {...query, posts, isStale, limit};
}
