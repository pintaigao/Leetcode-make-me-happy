import { http, HttpResponse } from 'msw';
import { addPost, listPosts, setReaction } from './db';
import type { ReactionType } from '../types/newsfeed';

export const handlers = [
  http.get('/api/feed', ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = Number(url.searchParams.get('limit') ?? '10');

    const { items, nextCursor } = listPosts({ cursor, limit: Math.min(Math.max(limit, 1), 50) });

    return HttpResponse.json({ posts: items, cursor: nextCursor });
  }),

  http.post('/api/posts', async ({ request }) => {
    const body = (await request.json()) as { message?: string; imageUrl?: string };
    const message = (body.message ?? '').trim();
    const imageUrl = (body.imageUrl ?? '').trim();

    if (!message && !imageUrl) {
      return new HttpResponse('Message or imageUrl required', { status: 400 });
    }

    const created = addPost({ message, imageUrl: imageUrl || undefined });
    return HttpResponse.json(created, { status: 201 });
  }),

  http.post('/api/posts/:postId/reactions', async ({ params, request }) => {
    const postId = String(params.postId);
    const body = (await request.json()) as { reaction?: ReactionType | null };
    const reaction = body.reaction ?? null;

    try {
      const updated = setReaction(postId, reaction);
      return HttpResponse.json(updated);
    } catch (e: any) {
      return new HttpResponse(e?.message ?? 'Error', { status: 404 });
    }
  }),
];
