import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CreatePostInput } from '../types/newsfeed';
import { useFeedActions } from '../store/feedStore';

export default function PostComposer() {
  const { submitPost } = useFeedActions();
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => message.trim().length > 0 || imageUrl.trim().length > 0, [message, imageUrl]);

  const submit = useCallback(() => {
    if (!canSubmit || submitting) return;
    const input: CreatePostInput = {
      message: message.trim(),
      imageUrl: imageUrl.trim() || undefined,
    };
    setSubmitting(true);
    setError(null);
    submitPost(input)
      .then(() => {
        setMessage('');
        setImageUrl('');
        textareaRef.current?.focus();
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Failed to post');
      })
      .finally(() => setSubmitting(false));
  }, [canSubmit, submitting, message, imageUrl, submitPost]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to post
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [submit]);

  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="avatar" aria-hidden />
        <div style={{ flex: 1 }}>
          <textarea
            ref={textareaRef}
            className="input"
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <input
              className="input"
              placeholder="Optional image URL (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              aria-label="Image URL"
            />
            <button className="btn" onClick={submit} disabled={!canSubmit || submitting}>
              {submitting ? 'Posting…' : 'Post'}
            </button>
          </div>
          <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
            Tip: <span className="kbd">Ctrl</span>/<span className="kbd">Cmd</span> + <span className="kbd">Enter</span> to post.
          </div>
          {error ? (
            <div className="banner" role="alert">
              Failed to post: {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
