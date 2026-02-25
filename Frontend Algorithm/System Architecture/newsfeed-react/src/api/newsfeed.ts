import type { CreatePostInput, FeedPage, Post, ReactionType } from '../types/newsfeed';
import { api } from './client';

export function fetchFeedPage(params: { cursor: string | null; limit: number }) {
  const usp = new URLSearchParams();
  if (params.cursor) usp.set('cursor', params.cursor);
  usp.set('limit', String(params.limit));
  return api<FeedPage>(`/api/feed?${usp.toString()}`);
}

export function createPost(input: CreatePostInput) {
  return api<Post>(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function reactToPost(params: { postId: string; reaction: ReactionType | null }) {
  return api<Post>(`/api/posts/${params.postId}/reactions`, {
    method: 'POST',
    body: JSON.stringify({ reaction: params.reaction }),
  });
}
