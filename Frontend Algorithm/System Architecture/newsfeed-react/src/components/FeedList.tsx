import { useCallback, useEffect, useMemo } from 'react';
import PostCard from './PostCard';
import { useIntersection } from '../lib/useIntersection';
import { useInfiniteFeed } from '../store/useInfiniteFeed';

const SCROLL_KEY = 'newsfeed:scrollY';

export default function FeedList() {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch, isStale } =
    useInfiniteFeed();

  // Restore scroll position
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      const y = Number(saved);
      if (!Number.isNaN(y)) window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    }

    const onScroll = () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersection<HTMLDivElement>({
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: loadMore,
    // Preload before user hits the bottom (reduce waiting time)
    rootMargin: '900px 0px',
  });

  const skeletons = useMemo(() => Array.from({ length: 3 }), []);

  if (isLoading) {
    return (
      <div className="feed" aria-busy="true">
        {skeletons.map((_, i) => (
          <div key={i} className="skeleton" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card" style={{ padding: 12 }} role="alert">
        <div style={{ fontWeight: 600 }}>Failed to load feed</div>
        <div className="muted" style={{ marginTop: 6 }}>
          {(error as Error).message}
        </div>
        <button className="btn" style={{ marginTop: 10 }} onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {isStale ? (
        <div className="banner" role="status">
          This feed might be stale. <button className="btn" onClick={() => refetch()}>Refresh</button>
        </div>
      ) : null}

      <div className="feed">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        <div ref={sentinelRef} style={{ height: 1 }} aria-hidden />

        {isFetchingNextPage ? <div className="skeleton" /> : null}

        {!hasNextPage ? (
          <div className="footer">You’ve reached the end (mock data).</div>
        ) : null}
      </div>
    </>
  );
}
