import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post, ReactionType } from '../types/newsfeed';
import { reactToPost } from '../api/newsfeed';

const LABELS: Record<ReactionType, string> = {
  like: 'Like',
  love: 'Love',
  haha: 'Haha',
  wow: 'Wow',
  sad: 'Sad',
  angry: 'Angry',
};

export default function ReactionButton({ post, onOpenPicker }: { post: Post; onOpenPicker: () => void }) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (reaction: ReactionType | null) => reactToPost({ postId: post.id, reaction }),
    onMutate: async (reaction) => {
      await qc.cancelQueries({ queryKey: ['feed'] });

      const prev = qc.getQueryData<any>(['feed']);
      qc.setQueryData(['feed'], (old: any) => optimisticReact(old, post.id, reaction));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['feed'], ctx.prev);
    },
    onSuccess: (updated) => {
      qc.setQueryData(['feed'], (old: any) => replacePost(old, updated));
    },
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ postId: string; reaction: ReactionType | null }>;
      if (ce.detail?.postId !== post.id) return;
      mutation.mutate(ce.detail.reaction);
    };
    window.addEventListener('reaction:select', handler);
    return () => window.removeEventListener('reaction:select', handler);
  }, [mutation, post.id]);

  const viewer = post.reactions.viewerReaction;
  const label = viewer ? LABELS[viewer] : 'React';

  return (
    <button
      className="btn reaction"
      onClick={() => {
        // Quick-like toggles "like".
        mutation.mutate(viewer === 'like' ? null : 'like');
      }}
      onContextMenu={(e) => {
        // Right click to open picker (study-friendly alternative to hover).
        e.preventDefault();
        onOpenPicker();
      }}
      title="Click: toggle Like. Right-click: open reactions picker."
      aria-label="React"
      disabled={mutation.isPending}
    >
      <span aria-hidden>{viewer ? emoji(viewer) : '👍'}</span>
      <span>{label}</span>
    </button>
  );
}

function emoji(r: ReactionType) {
  switch (r) {
    case 'like':
      return '👍';
    case 'love':
      return '❤️';
    case 'haha':
      return '😆';
    case 'wow':
      return '😮';
    case 'sad':
      return '😢';
    case 'angry':
      return '😡';
  }
}

function optimisticReact(old: any, postId: string, reaction: ReactionType | null) {
  if (!old?.pages) return old;
  const pages = old.pages.map((p: any) => ({
    ...p,
    posts: p.posts.map((post: Post) => {
      if (post.id !== postId) return post;
      const prev = post.reactions.viewerReaction;
      const counts = { ...post.reactions.counts } as Record<ReactionType, number>;

      if (prev) counts[prev] = Math.max(0, (counts[prev] ?? 0) - 1);
      if (reaction) counts[reaction] = (counts[reaction] ?? 0) + 1;

      return {
        ...post,
        reactions: {
          ...post.reactions,
          viewerReaction: reaction,
          counts,
        },
      };
    }),
  }));
  return { ...old, pages };
}

function replacePost(old: any, updated: Post) {
  if (!old?.pages) return old;
  const pages = old.pages.map((p: any) => ({
    ...p,
    posts: p.posts.map((post: Post) => (post.id === updated.id ? updated : post)),
  }));
  return { ...old, pages };
}
