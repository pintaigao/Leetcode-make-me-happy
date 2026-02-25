import { useEffect, useState } from 'react';
import type { Post, ReactionType } from '../types/newsfeed';
import { useFeedActions } from '../store/feedStore';

const LABELS: Record<ReactionType, string> = {
  like: 'Like',
  love: 'Love',
  haha: 'Haha',
  wow: 'Wow',
  sad: 'Sad',
  angry: 'Angry',
};

export default function ReactionButton({ post, onOpenPicker }: { post: Post; onOpenPicker: () => void }) {
  const { toggleLike, setReaction } = useFeedActions();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ postId: string; reaction: ReactionType | null }>;
      if (ce.detail?.postId !== post.id) return;
      setPending(true);
      setReaction(post.id, ce.detail.reaction)
        .catch(() => {
          // rollback happens in store
        })
        .finally(() => setPending(false));
    };
    window.addEventListener('reaction:select', handler);
    return () => window.removeEventListener('reaction:select', handler);
  }, [post.id, setReaction]);

  const viewer = post.reactions.viewerReaction;
  const label = viewer ? LABELS[viewer] : 'React';

  return (
    <button
      className="btn reaction"
      onClick={() => {
        // Quick-like toggles "like".
        setPending(true);
        toggleLike(post.id)
          .catch(() => {
            // rollback happens in store
          })
          .finally(() => setPending(false));
      }}
      onContextMenu={(e) => {
        // Right click to open picker (study-friendly alternative to hover).
        e.preventDefault();
        onOpenPicker();
      }}
      title="Click: toggle Like. Right-click: open reactions picker."
      aria-label="React"
      disabled={pending}
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

// Optimistic logic lives in the reducer now.
