import { Injectable, computed, signal } from '@angular/core';
import { finalize, firstValueFrom } from 'rxjs';
import { FeedApiService } from './feed-api.service';
import { Post, Reaction } from './models';

function genId(prefix = 'tmp') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

@Injectable({ providedIn: 'root' })
export class FeedStore {
  private readonly _items = signal<Post[]>([]);
  private readonly _cursor = signal<string | null>(null);
  private readonly _hasMore = signal(true);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly items = computed(() => this._items());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());
  readonly hasMore = computed(() => this._hasMore());

  constructor(private api: FeedApiService) {}

  async initIfEmpty() {
    if (this._items().length === 0) await this.loadNextPage();
  }

  async loadNextPage() {
    if (this._loading() || !this._hasMore()) return;

    this._loading.set(true);
    this._error.set(null);

    try {
      const page = await firstValueFrom(this.api.getFeed(this._cursor(), 10));
      this._items.set([...this._items(), ...page.items]);
      this._cursor.set(page.nextCursor);
      this._hasMore.set(Boolean(page.nextCursor));
    } catch (e: any) {
      this._error.set(e?.message ?? 'Failed to load feed');
    } finally {
      this._loading.set(false);
    }
  }

  async createPost(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    // optimistic insert at top
    const optimistic: Post = {
      id: genId('local'),
      author: { id: 'me', name: 'You' },
      content: trimmed,
      createdAt: new Date().toISOString(),
      reactions: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 },
      myReaction: null,
    };

    this._items.set([optimistic, ...this._items()]);

    try {
      const created = await firstValueFrom(this.api.createPost(trimmed));
      // replace optimistic
      this._items.set(this._items().map((p) => (p.id === optimistic.id ? created : p)));
    } catch {
      // rollback
      this._items.set(this._items().filter((p) => p.id !== optimistic.id));
      throw new Error('Create post failed');
    }
  }

  async react(postId: string, reaction: Reaction | null) {
    const prev = this._items();
    const idx = prev.findIndex((p) => p.id === postId);
    if (idx < 0) return;

    const post = prev[idx];
    const before = structuredClone(post) as Post;

    // optimistic update
    const next = structuredClone(post) as Post;
    const old = next.myReaction ?? null;
    if (old) next.reactions[old] = Math.max(0, (next.reactions[old] ?? 0) - 1);
    next.myReaction = reaction;
    if (reaction) next.reactions[reaction] = (next.reactions[reaction] ?? 0) + 1;

    const patched = [...prev.slice(0, idx), next, ...prev.slice(idx + 1)];
    this._items.set(patched);

    try {
      const serverPost = await firstValueFrom(this.api.react(postId, reaction));
      this._items.set(this._items().map((p) => (p.id === postId ? serverPost : p)));
    } catch {
      // rollback
      this._items.set(this._items().map((p) => (p.id === postId ? before : p)));
      throw new Error('Reaction failed');
    }
  }
}
