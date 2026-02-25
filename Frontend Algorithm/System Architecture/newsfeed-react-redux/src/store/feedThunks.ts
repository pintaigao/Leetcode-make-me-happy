import type { AnyAction } from 'redux';
import type { RootState, Thunk } from './store';
import type { CreatePostInput, ReactionType } from '../types/newsfeed';
import { createPost, fetchFeedPage, reactToPost } from '../api/newsfeed';
import { computeDynamicLimit, emptyCounts, feedActions, type FetchMode } from './feedReducer';
import type { ReactionSnapshot } from './types';

function getErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : 'Unknown error';
}

export const initFeed = (): Thunk => (dispatch, getState) => {
  const { feed } = getState();
  if (feed.limit === 10) {
    dispatch(feedActions.setLimit(computeDynamicLimit()) as AnyAction);
  }
};

const load = (mode: FetchMode): Thunk<Promise<void>> => async (dispatch, getState) => {
  const state = getState();
  const { feed } = state;

  // best-effort overlap protection
  if (feed.inFlight[mode]) return;

  if (mode === 'more') {
    if (!feed.hasMore || feed.loadingMore || feed.loading) return;
  }

  dispatch(feedActions.fetchStart(mode) as AnyAction);

  try {
    const cursor = mode === 'more' ? feed.cursor : null;
    const page = await fetchFeedPage({ cursor, limit: feed.limit });
    dispatch(feedActions.fetchSuccess(mode, page.posts, page.cursor) as AnyAction);
  } catch (e) {
    dispatch(feedActions.fetchError(mode, getErrorMessage(e)) as AnyAction);
  }
};

export const loadInitialIfNeeded = (): Thunk<Promise<void>> => async (dispatch, getState) => {
  const { feed } = getState();
  if (feed.order.length > 0) return;
  await dispatch(load('initial') as unknown as AnyAction);
};

export const refreshFeed = (): Thunk<Promise<void>> => async (dispatch) => {
  await dispatch(load('refresh') as unknown as AnyAction);
};

export const loadMoreFeed = (): Thunk<Promise<void>> => async (dispatch) => {
  await dispatch(load('more') as unknown as AnyAction);
};

export const submitPost = (input: CreatePostInput): Thunk<Promise<void>> => async (dispatch) => {
  const created = await createPost(input);
  dispatch(feedActions.prependPost(created) as AnyAction);
};

export const setReaction = (postId: string, reaction: ReactionType | null): Thunk<Promise<void>> =>
  async (dispatch, getState) => {
    const { feed } = getState();
    const post = feed.postsById[postId];
    if (!post) return;

    const snapshot: ReactionSnapshot = {
      viewerReaction: post.reactions.viewerReaction,
      counts: { ...(post.reactions.counts ?? emptyCounts()) },
    };

    dispatch(feedActions.applyReactionOptimistic(postId, reaction, snapshot) as AnyAction);

    try {
      const updated = await reactToPost({ postId, reaction });
      dispatch(feedActions.replacePost(updated) as AnyAction);
    } catch (e) {
      dispatch(feedActions.rollbackReaction(postId, snapshot) as AnyAction);
      throw e;
    }
  };

export const toggleLike = (postId: string): Thunk<Promise<void>> => async (dispatch, getState) => {
  const { feed } = getState();
  const post = feed.postsById[postId];
  if (!post) return;
  const next = post.reactions.viewerReaction === 'like' ? null : 'like';
  await dispatch(setReaction(postId, next) as unknown as AnyAction);
};

export const selectIsStale = (state: RootState): boolean => {
  const ts = state.feed.lastSuccessfulFetchAt;
  if (!ts) return false;
  return Date.now() - ts > 2 * 60 * 60 * 1000;
};

export const selectPosts = (state: RootState) =>
  state.feed.order.map((id) => state.feed.postsById[id]).filter(Boolean);
