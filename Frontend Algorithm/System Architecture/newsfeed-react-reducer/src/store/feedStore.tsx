import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import type { CreatePostInput, Post, ReactionType } from '../types/newsfeed';
import { createPost, fetchFeedPage, reactToPost } from '../api/newsfeed';

type FeedState = {
  postsById: Record<string, Post>;
  order: string[]; // newest first
  cursor: string | null;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  limit: number;
  lastSuccessfulFetchAt: number | null;
};

type ReactionSnapshot = {
  viewerReaction: ReactionType | null;
  counts: Record<ReactionType, number>;
};

type Action =
  | { type: 'SET_LIMIT'; limit: number }
  | { type: 'FETCH_START'; mode: 'initial' | 'more' | 'refresh' }
  | { type: 'FETCH_SUCCESS'; posts: Post[]; cursor: string | null; mode: 'initial' | 'more' | 'refresh' }
  | { type: 'FETCH_ERROR'; message: string; mode: 'initial' | 'more' | 'refresh' }
  | { type: 'PREPEND_POST'; post: Post }
  | { type: 'REPLACE_POST'; post: Post }
  | { type: 'APPLY_REACTION_OPTIMISTIC'; postId: string; reaction: ReactionType | null; snapshot: ReactionSnapshot }
  | { type: 'ROLLBACK_REACTION'; postId: string; snapshot: ReactionSnapshot };

function emptyCounts(): Record<ReactionType, number> {
  return { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
}

function computeDynamicLimit(): number {
  // Rough heuristic: one post ~ 180px tall on average.
  const approxPostHeight = 180;
  const screen = typeof window !== 'undefined' ? window.innerHeight : 900;
  const base = Math.ceil(screen / approxPostHeight);
  return Math.min(25, Math.max(8, base + 6));
}

const initialState: FeedState = {
  postsById: {},
  order: [],
  cursor: null,
  hasMore: true,
  loading: false,
  loadingMore: false,
  error: null,
  limit: 10,
  lastSuccessfulFetchAt: null,
};

function mergeIntoState(state: FeedState, incoming: Post[], mode: 'initial' | 'more' | 'refresh'): FeedState {
  const postsById = { ...state.postsById };
  for (const p of incoming) postsById[p.id] = p;

  const incomingIds = incoming.map((p) => p.id);

  let order: string[];
  if (mode === 'more') {
    // Append at the end (older posts)
    const seen = new Set(state.order);
    order = [...state.order];
    for (const id of incomingIds) if (!seen.has(id)) order.push(id);
  } else {
    // Replace order on initial/refresh to match server ordering
    order = incomingIds;
  }

  return { ...state, postsById, order };
}

function reducer(state: FeedState, action: Action): FeedState {
  switch (action.type) {
    case 'SET_LIMIT':
      return { ...state, limit: action.limit };

    case 'FETCH_START':
      return {
        ...state,
        error: null,
        loading: action.mode !== 'more',
        loadingMore: action.mode === 'more',
      };

    case 'FETCH_SUCCESS': {
      const next = mergeIntoState(state, action.posts, action.mode);
      return {
        ...next,
        cursor: action.cursor,
        hasMore: action.cursor !== null,
        loading: false,
        loadingMore: false,
        error: null,
        lastSuccessfulFetchAt: Date.now(),
      };
    }

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: action.message,
      };

    case 'PREPEND_POST': {
      const postsById = { ...state.postsById, [action.post.id]: action.post };
      const order = [action.post.id, ...state.order.filter((id) => id !== action.post.id)];
      return { ...state, postsById, order };
    }

    case 'REPLACE_POST': {
      if (!state.postsById[action.post.id]) return state;
      return { ...state, postsById: { ...state.postsById, [action.post.id]: action.post } };
    }

    case 'APPLY_REACTION_OPTIMISTIC': {
      const post = state.postsById[action.postId];
      if (!post) return state;

      const prev = post.reactions.viewerReaction;
      const counts = { ...(post.reactions.counts ?? emptyCounts()) } as Record<ReactionType, number>;

      if (prev) counts[prev] = Math.max(0, (counts[prev] ?? 0) - 1);
      if (action.reaction) counts[action.reaction] = (counts[action.reaction] ?? 0) + 1;

      const updated: Post = {
        ...post,
        reactions: {
          ...post.reactions,
          viewerReaction: action.reaction,
          counts,
        },
      };

      return { ...state, postsById: { ...state.postsById, [action.postId]: updated } };
    }

    case 'ROLLBACK_REACTION': {
      const post = state.postsById[action.postId];
      if (!post) return state;
      const updated: Post = {
        ...post,
        reactions: {
          ...post.reactions,
          viewerReaction: action.snapshot.viewerReaction,
          counts: action.snapshot.counts,
        },
      };
      return { ...state, postsById: { ...state.postsById, [action.postId]: updated } };
    }

    default:
      return state;
  }
}

type FeedActions = {
  loadInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  submitPost: (input: CreatePostInput) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  setReaction: (postId: string, reaction: ReactionType | null) => Promise<void>;
};

const FeedStateCtx = createContext<FeedState | null>(null);
const FeedActionsCtx = createContext<FeedActions | null>(null);

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Prevent overlapping requests.
  const inFlight = useRef<{ initial: boolean; more: boolean; refresh: boolean }>({
    initial: false,
    more: false,
    refresh: false,
  });

  // Tune limit after first paint.
  useEffect(() => {
    dispatch({ type: 'SET_LIMIT', limit: computeDynamicLimit() });
  }, []);

  const load = useCallback(
    async (mode: 'initial' | 'more' | 'refresh') => {
      const key = mode;
      if (inFlight.current[key]) return;
      inFlight.current[key] = true;
      try {
        dispatch({ type: 'FETCH_START', mode });
        const cursor = mode === 'more' ? state.cursor : null;
        const page = await fetchFeedPage({ cursor, limit: state.limit });
        dispatch({ type: 'FETCH_SUCCESS', posts: page.posts, cursor: page.cursor, mode });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        dispatch({ type: 'FETCH_ERROR', message, mode });
      } finally {
        inFlight.current[key] = false;
      }
    },
    [state.cursor, state.limit]
  );

  const loadInitial = useCallback(async () => {
    if (state.order.length > 0) return;
    await load('initial');
  }, [load, state.order.length]);

  const loadMore = useCallback(async () => {
    if (!state.hasMore || state.loadingMore || state.loading) return;
    await load('more');
  }, [load, state.hasMore, state.loadingMore, state.loading]);

  const refresh = useCallback(async () => {
    await load('refresh');
  }, [load]);

  const submitPost = useCallback(async (input: CreatePostInput) => {
    const created = await createPost(input);
    dispatch({ type: 'PREPEND_POST', post: created });
  }, []);

  const setReaction = useCallback(
    async (postId: string, reaction: ReactionType | null) => {
      const post = state.postsById[postId];
      if (!post) return;

      const snapshot: ReactionSnapshot = {
        viewerReaction: post.reactions.viewerReaction,
        counts: { ...(post.reactions.counts ?? emptyCounts()) },
      };

      dispatch({ type: 'APPLY_REACTION_OPTIMISTIC', postId, reaction, snapshot });
      try {
        const updated = await reactToPost({ postId, reaction });
        dispatch({ type: 'REPLACE_POST', post: updated });
      } catch (e) {
        dispatch({ type: 'ROLLBACK_REACTION', postId, snapshot });
        throw e;
      }
    },
    [state.postsById]
  );

  const toggleLike = useCallback(
    async (postId: string) => {
      const post = state.postsById[postId];
      if (!post) return;
      const next = post.reactions.viewerReaction === 'like' ? null : 'like';
      await setReaction(postId, next);
    },
    [setReaction, state.postsById]
  );

  const actions = useMemo<FeedActions>(
    () => ({ loadInitial, loadMore, refresh, submitPost, toggleLike, setReaction }),
    [loadInitial, loadMore, refresh, submitPost, toggleLike, setReaction]
  );

  return (
    <FeedStateCtx.Provider value={state}>
      <FeedActionsCtx.Provider value={actions}>{children}</FeedActionsCtx.Provider>
    </FeedStateCtx.Provider>
  );
}

export function useFeedState() {
  const ctx = useContext(FeedStateCtx);
  if (!ctx) throw new Error('useFeedState must be used within <FeedProvider>');
  return ctx;
}

export function useFeedActions() {
  const ctx = useContext(FeedActionsCtx);
  if (!ctx) throw new Error('useFeedActions must be used within <FeedProvider>');
  return ctx;
}

export function useFeedPosts(): Post[] {
  const state = useFeedState();
  return useMemo(() => state.order.map((id) => state.postsById[id]).filter(Boolean), [state.order, state.postsById]);
}

export function useFeedIsStale(): boolean {
  const { lastSuccessfulFetchAt } = useFeedState();
  return useMemo(() => {
    if (!lastSuccessfulFetchAt) return false;
    return Date.now() - lastSuccessfulFetchAt > 2 * 60 * 60 * 1000;
  }, [lastSuccessfulFetchAt]);
}
