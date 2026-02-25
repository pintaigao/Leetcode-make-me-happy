import type { AnyAction } from 'redux';
import type { Post, ReactionType } from '../types/newsfeed';
import type { FeedState, ReactionSnapshot } from './types';

export function emptyCounts(): Record<ReactionType, number> {
  return { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 };
}

export function computeDynamicLimit(): number {
  // Rough heuristic: one post ~ 180px tall on average.
  const approxPostHeight = 180;
  const screen = typeof window !== 'undefined' ? window.innerHeight : 900;
  const base = Math.ceil(screen / approxPostHeight);
  return Math.min(25, Math.max(8, base + 6));
}

export const FEED_SET_LIMIT = 'feed/SET_LIMIT';
export const FEED_FETCH_START = 'feed/FETCH_START';
export const FEED_FETCH_SUCCESS = 'feed/FETCH_SUCCESS';
export const FEED_FETCH_ERROR = 'feed/FETCH_ERROR';
export const FEED_PREPEND_POST = 'feed/PREPEND_POST';
export const FEED_REPLACE_POST = 'feed/REPLACE_POST';
export const FEED_APPLY_REACTION_OPTIMISTIC = 'feed/APPLY_REACTION_OPTIMISTIC';
export const FEED_ROLLBACK_REACTION = 'feed/ROLLBACK_REACTION';

export type FetchMode = 'initial' | 'more' | 'refresh';

export const feedActions = {
  setLimit: (limit: number) => ({ type: FEED_SET_LIMIT, payload: { limit } }),
  fetchStart: (mode: FetchMode) => ({ type: FEED_FETCH_START, payload: { mode } }),
  fetchSuccess: (mode: FetchMode, posts: Post[], cursor: string | null) =>
    ({ type: FEED_FETCH_SUCCESS, payload: { mode, posts, cursor } }),
  fetchError: (mode: FetchMode, message: string) => ({ type: FEED_FETCH_ERROR, payload: { mode, message } }),
  prependPost: (post: Post) => ({ type: FEED_PREPEND_POST, payload: { post } }),
  replacePost: (post: Post) => ({ type: FEED_REPLACE_POST, payload: { post } }),
  applyReactionOptimistic: (postId: string, reaction: ReactionType | null, snapshot: ReactionSnapshot) =>
    ({ type: FEED_APPLY_REACTION_OPTIMISTIC, payload: { postId, reaction, snapshot } }),
  rollbackReaction: (postId: string, snapshot: ReactionSnapshot) =>
    ({ type: FEED_ROLLBACK_REACTION, payload: { postId, snapshot } }),
};

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
  inFlight: { initial: false, more: false, refresh: false },
};

function mergeIntoState(state: FeedState, incoming: Post[], mode: FetchMode): FeedState {
  const postsById = { ...state.postsById };
  for (const p of incoming) postsById[p.id] = p;

  const incomingIds = incoming.map((p) => p.id);

  let order: string[];
  if (mode === 'more') {
    const seen = new Set(state.order);
    order = [...state.order];
    for (const id of incomingIds) if (!seen.has(id)) order.push(id);
  } else {
    order = incomingIds;
  }

  return { ...state, postsById, order };
}

export function feedReducer(state: FeedState = initialState, action: AnyAction): FeedState {
  switch (action.type) {
    case FEED_SET_LIMIT:
      return { ...state, limit: action.payload.limit };

    case FEED_FETCH_START: {
      const mode: FetchMode = action.payload.mode;
      return {
        ...state,
        error: null,
        loading: mode !== 'more',
        loadingMore: mode === 'more',
        inFlight: { ...state.inFlight, [mode]: true },
      };
    }

    case FEED_FETCH_SUCCESS: {
      const { mode, posts, cursor } = action.payload as { mode: FetchMode; posts: Post[]; cursor: string | null };
      const next = mergeIntoState(state, posts, mode);
      return {
        ...next,
        cursor,
        hasMore: cursor !== null,
        loading: false,
        loadingMore: false,
        error: null,
        lastSuccessfulFetchAt: Date.now(),
        inFlight: { ...state.inFlight, [mode]: false },
      };
    }

    case FEED_FETCH_ERROR: {
      const { mode, message } = action.payload as { mode: FetchMode; message: string };
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: message,
        inFlight: { ...state.inFlight, [mode]: false },
      };
    }

    case FEED_PREPEND_POST: {
      const post: Post = action.payload.post;
      const postsById = { ...state.postsById, [post.id]: post };
      const order = [post.id, ...state.order.filter((id) => id !== post.id)];
      return { ...state, postsById, order };
    }

    case FEED_REPLACE_POST: {
      const post: Post = action.payload.post;
      if (!state.postsById[post.id]) return state;
      return { ...state, postsById: { ...state.postsById, [post.id]: post } };
    }

    case FEED_APPLY_REACTION_OPTIMISTIC: {
      const { postId, reaction } = action.payload as { postId: string; reaction: ReactionType | null; snapshot: ReactionSnapshot };
      const post = state.postsById[postId];
      if (!post) return state;

      const prev = post.reactions.viewerReaction;
      const counts = { ...(post.reactions.counts ?? emptyCounts()) } as Record<ReactionType, number>;

      if (prev) counts[prev] = Math.max(0, (counts[prev] ?? 0) - 1);
      if (reaction) counts[reaction] = (counts[reaction] ?? 0) + 1;

      const updated: Post = {
        ...post,
        reactions: {
          ...post.reactions,
          viewerReaction: reaction,
          counts,
        },
      };

      return { ...state, postsById: { ...state.postsById, [postId]: updated } };
    }

    case FEED_ROLLBACK_REACTION: {
      const { postId, snapshot } = action.payload as { postId: string; snapshot: ReactionSnapshot };
      const post = state.postsById[postId];
      if (!post) return state;
      const updated: Post = {
        ...post,
        reactions: {
          ...post.reactions,
          viewerReaction: snapshot.viewerReaction,
          counts: snapshot.counts,
        },
      };
      return { ...state, postsById: { ...state.postsById, [postId]: updated } };
    }

    default:
      return state;
  }
}
