import type { Post, ReactionType } from '../types/newsfeed';

export type FeedState = {
  postsById: Record<string, Post>;
  order: string[]; // newest first
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  limit: number;
  lastSuccessfulFetchAt: number | null;
  // used to avoid overlapping requests (best-effort)
  inFlight: {
    initial: boolean;
    more: boolean;
    refresh: boolean;
  };
};

export type ReactionSnapshot = {
  viewerReaction: ReactionType | null;
  counts: Record<ReactionType, number>;
};
