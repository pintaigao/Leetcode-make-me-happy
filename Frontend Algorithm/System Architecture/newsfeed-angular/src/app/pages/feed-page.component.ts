import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComposerComponent } from '../components/post-composer.component';
import { FeedListComponent } from '../components/feed-list.component';
import { FeedStore } from '../feed-store.service';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [CommonModule, PostComposerComponent, FeedListComponent],
  template: `
    <div class="stack">
      <app-post-composer />

      <app-feed-list
        [items]="store.items()"
        (loadMore)="store.loadNextPage()"
      />

      <div class="loading" *ngIf="store.loading()">Loading…</div>
      <div class="loading" *ngIf="store.error()">{{ store.error() }}</div>
      <div class="loading" *ngIf="!store.hasMore() && store.items().length">— End —</div>
    </div>
  `,
})
export class FeedPageComponent {
  store = inject(FeedStore);

  constructor() {
    // kick off initial load
    queueMicrotask(() => this.store.initIfEmpty());
  }
}
