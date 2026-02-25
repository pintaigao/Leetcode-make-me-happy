import { Suspense, lazy, useMemo, useState } from 'react';
import type { Post, ReactionType } from '../types/newsfeed';
import { formatRelativeTime } from '../lib/time';
import ReactionButton from './ReactionButton';

const ReactionPicker = lazy(() => import('./ReactionPicker'));

export default function PostCard({ post }: { post: Post }) {
  const createdLabel = useMemo(() => formatRelativeTime(post.createdTime), [post.createdTime]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <article className="card post">
      <header className="post-header">
        <div className="row" style={{ alignItems: 'center' }}>
          <div className="avatar" aria-hidden>
            <img alt="" src={post.author.profilePhotoUrl} />
          </div>
          <div className="post-title">
            <div style={{ fontWeight: 600 }}>{post.author.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{createdLabel}</div>
          </div>
        </div>
        <button className="btn" aria-label="More" title="More">
          ⋯
        </button>
      </header>

      {post.content ? <div className="post-content">{post.content}</div> : null}
      {post.imageUrl ? (
        <div className="post-image">
          <img src={post.imageUrl} alt="Post attachment" loading="lazy" />
        </div>
      ) : null}

      <div className="actions" aria-label="Post actions">
        <div style={{ position: 'relative' }}>
          <ReactionButton post={post} onOpenPicker={() => setPickerOpen((v) => !v)} />
          {pickerOpen ? (
            <Suspense
              fallback={
                <div className="card" style={{ position: 'absolute', top: -52, left: 0, padding: 8 }}>
                  Loading…
                </div>
              }
            >
              <ReactionPicker
                selected={post.reactions.viewerReaction}
                onSelect={(r: ReactionType | null) => {
                  setPickerOpen(false);
                  // ReactionButton handles mutation; we dispatch via custom event.
                  window.dispatchEvent(new CustomEvent('reaction:select', { detail: { postId: post.id, reaction: r } }));
                }}
              />
            </Suspense>
          ) : null}
        </div>
        <button className="btn" disabled title="(Out of scope) Comment">
          Comment
        </button>
        <button className="btn" disabled title="(Out of scope) Share">
          Share
        </button>
      </div>

      <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
        Reactions: {sumReactions(post.reactions.counts)}
      </div>
    </article>
  );
}

function sumReactions(counts: Record<string, number>) {
  return Object.values(counts).reduce((a, b) => a + b, 0);
}
