import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreatePostInput, Post } from '../types/newsfeed';
import { createPost } from '../api/newsfeed';

export default function PostComposer() {
  const qc = useQueryClient();
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const canSubmit = useMemo(() => message.trim().length > 0 || imageUrl.trim().length > 0, [message, imageUrl]);

  const mutation = useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: (created: Post) => {
      // Insert at top of the first page for instant feedback.
      qc.setQueryData(['feed'], (old: any) => {
        if (!old?.pages?.length) return old;
        const pages = [...old.pages];
        pages[0] = { ...pages[0], posts: [created, ...pages[0].posts] };
        return { ...old, pages };
      });
      setMessage('');
      setImageUrl('');
      textareaRef.current?.focus();
    },
  });

  const submit = useCallback(() => {
    if (!canSubmit || mutation.isPending) return;
    mutation.mutate({
      message: message.trim(),
      imageUrl: imageUrl.trim() || undefined,
    });
  }, [canSubmit, mutation, message, imageUrl]);

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
            <button className="btn" onClick={submit} disabled={!canSubmit || mutation.isPending}>
              {mutation.isPending ? 'Posting…' : 'Post'}
            </button>
          </div>
          <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
            Tip: <span className="kbd">Ctrl</span>/<span className="kbd">Cmd</span> + <span className="kbd">Enter</span> to post.
          </div>
          {mutation.isError ? (
            <div className="banner" role="alert">
              Failed to post: {(mutation.error as Error).message}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
