import { useCallback, useEffect, useMemo } from 'react';
import PostCard from './PostCard';
import { useIntersection } from '../lib/useIntersection';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initFeed, loadInitialIfNeeded, loadMoreFeed, refreshFeed, selectIsStale, selectPosts } from '../store/feedThunks';

const SCROLL_KEY = 'newsfeed:scrollY';

export default function FeedList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isStale = useAppSelector(selectIsStale);
  const { hasMore, loading, loadingMore, error } = useAppSelector((s) => s.feed);

  useEffect(() => {
    dispatch(initFeed());
    dispatch(loadInitialIfNeeded());
  }, [dispatch]);

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

  const onLoadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    dispatch(loadMoreFeed());
  }, [dispatch, hasMore, loadingMore]);

  const sentinelRef = useIntersection<HTMLDivElement>({
    enabled: hasMore && !loadingMore,
    onIntersect: onLoadMore,
    // Preload before user hits the bottom (reduce waiting time)
    rootMargin: '900px 0px',
  });

  const skeletons = useMemo(() => Array.from({ length: 3 }), []);

  if (loading && posts.length === 0) {
    return (
      <div className="feed" aria-busy="true">
        {skeletons.map((_, i) => (
          <div key={i} className="skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ padding: 12 }} role="alert">
        <div style={{ fontWeight: 600 }}>Failed to load feed</div>
        <div className="muted" style={{ marginTop: 6 }}>
          {error}
        </div>
        <button className="btn" style={{ marginTop: 10 }} onClick={() => dispatch(refreshFeed())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {isStale ? (
        <div className="banner" role="status">
          This feed might be stale. <button className="btn" onClick={() => dispatch(refreshFeed())}>Refresh</button>
        </div>
      ) : null}

      <div className="feed">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        <div ref={sentinelRef} style={{ height: 1 }} aria-hidden />

        {loadingMore ? <div className="skeleton" /> : null}

        {!hasMore ? (
          <div className="footer">You’ve reached the end (mock data).</div>
        ) : null}
      </div>
    </>
  );
}
