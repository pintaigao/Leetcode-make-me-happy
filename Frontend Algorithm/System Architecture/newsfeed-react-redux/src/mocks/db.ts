import type { Post, ReactionType, Reactions, User } from '../types/newsfeed';

export const viewer: User = {
  id: 'u0',
  name: 'Teddy (viewer)',
  profilePhotoUrl: 'https://i.pravatar.cc/80?img=3',
};

const users: User[] = [
  viewer,
  { id: 'u1', name: 'Ava Chen', profilePhotoUrl: 'https://i.pravatar.cc/80?img=5' },
  { id: 'u2', name: 'Noah Patel', profilePhotoUrl: 'https://i.pravatar.cc/80?img=12' },
  { id: 'u3', name: 'Mia Johnson', profilePhotoUrl: 'https://i.pravatar.cc/80?img=32' },
  { id: 'u4', name: 'Liam Garcia', profilePhotoUrl: 'https://i.pravatar.cc/80?img=47' },
];

function emptyReactions(): Reactions {
  return {
    counts: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
    viewerReaction: null,
  };
}

function seedPosts(): Post[] {
  const now = Date.now();
  const imgs = [
    'https://picsum.photos/seed/feed1/800/500',
    'https://picsum.photos/seed/feed2/800/520',
    'https://picsum.photos/seed/feed3/800/480',
    'https://picsum.photos/seed/feed4/800/510',
  ];

  const texts = [
    'First solo cross-country prep day ✈️\nWeather looks good, but I’m triple-checking NOTAMs and alternates.',
    'Hot take: infinite scroll feels smooth only if you prefetch early and keep the main thread free.',
    'Tried a new coffee shop. The latte art was… questionable, but the vibes were elite.',
    'Built a tiny news feed clone to study cursor pagination + optimistic updates.',
    'If you’re learning React Query: the cache is your friend. Treat it like a client store.',
  ];

  const out: Post[] = [];
  for (let i = 0; i < 48; i++) {
    const author = users[(i % (users.length - 1)) + 1];
    const createdTime = now - (i * 37 + Math.floor(Math.random() * 10)) * 60_000;
    const imageUrl = i % 5 === 0 ? imgs[i % imgs.length] : undefined;

    const reactions = emptyReactions();
    // Add some random counts
    (Object.keys(reactions.counts) as ReactionType[]).forEach((k) => {
      reactions.counts[k] = Math.floor(Math.random() * (k === 'like' ? 30 : 8));
    });

    out.push({
      id: `p_${shortId()}`,
      createdTime,
      content: texts[i % texts.length],
      author,
      imageUrl,
      reactions,
    });
  }

  // newest first
  out.sort((a, b) => b.createdTime - a.createdTime || b.id.localeCompare(a.id));
  return out;
}

let posts = seedPosts();

export function listPosts(params: { cursor: string | null; limit: number }): { items: Post[]; nextCursor: string | null } {
  const { cursor, limit } = params;

  const decoded = cursor ? decodeCursor(cursor) : null;

  const filtered = decoded
    ? posts.filter((p) => p.createdTime < decoded.createdTime || (p.createdTime === decoded.createdTime && p.id < decoded.id))
    : posts;

  const items = filtered.slice(0, limit);
  const last = items[items.length - 1];
  const nextCursor = last ? encodeCursor({ createdTime: last.createdTime, id: last.id }) : null;

  return { items, nextCursor };
}

export function addPost(input: { message: string; imageUrl?: string }): Post {
  const created: Post = {
    id: `p_${shortId()}`,
    createdTime: Date.now(),
    content: input.message,
    imageUrl: input.imageUrl,
    author: viewer,
    reactions: {
      counts: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      viewerReaction: null,
    },
  };

  posts = [created, ...posts].sort((a, b) => b.createdTime - a.createdTime || b.id.localeCompare(a.id));
  return created;
}

export function setReaction(postId: string, reaction: ReactionType | null): Post {
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx < 0) throw new Error('Post not found');

  const post = posts[idx];
  const prev = post.reactions.viewerReaction;
  const counts = { ...post.reactions.counts } as Record<ReactionType, number>;

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

  posts[idx] = updated;
  return updated;
}

function encodeCursor(v: { createdTime: number; id: string }) {
  return btoa(JSON.stringify(v));
}

function decodeCursor(s: string): { createdTime: number; id: string } {
  return JSON.parse(atob(s));
}

function shortId(): string {
  // Avoid external deps: nanoid -> crypto/random.
  // In modern browsers, crypto.randomUUID exists.
  // Fallback for older environments.
  const anyCrypto = globalThis.crypto as Crypto | undefined;
  if (anyCrypto?.randomUUID) return anyCrypto.randomUUID().replace(/-/g, '').slice(0, 10);
  return Math.random().toString(36).slice(2, 12);
}
