import { Component, Input, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FeedStore } from '../feed-store.service';
import { Post, Reaction } from '../models';
import { ReactionPickerComponent } from './reaction-picker.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactionPickerComponent],
  template: `
    <div class="card post">
      <div class="meta">
        <div>
          <b>{{ post.author.name }}</b>
          <span class="badge" style="margin-left: 8px;">{{ post.createdAt | date:'MMM d, y, h:mm a' }}</span>
        </div>
        <div class="badge">{{ post.id }}</div>
      </div>

      <div class="content">{{ post.content }}</div>

      <div class="actions">
        <button
          class="pill"
          type="button"
          [class.on]="post.myReaction === 'like'"
          (click)="toggleQuickLike()"
        >
          👍 <span>Like</span>
          <span class="badge">{{ post.reactions.like }}</span>
        </button>

        <button class="pill" type="button" (click)="showPicker.set(!showPicker())">
          😀 <span>Reactions</span>
        </button>

        <span class="badge" *ngIf="post.myReaction">You: {{ post.myReaction }}</span>
      </div>

      <div style="margin-top: 10px;" *ngIf="showPicker()">
        <app-reaction-picker
          [active]="post.myReaction"
          (pick)="onPick($event)"
        />
      </div>

      <div class="row" style="flex-wrap: wrap; margin-top: 10px;">
        <span class="badge" *ngFor="let k of reactionKeys">
          {{ k }}: {{ post.reactions[k] }}
        </span>
      </div>
    </div>
  `,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  showPicker = signal(false);
  reactionKeys: Reaction[] = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];

  constructor(private store: FeedStore) {}

  async toggleQuickLike() {
    const next: Reaction | null = this.post.myReaction === 'like' ? null : 'like';
    try {
      await this.store.react(this.post.id, next);
    } catch {
      alert('Reaction failed (rolled back).');
    }
  }

  async onPick(r: Reaction | null) {
    try {
      await this.store.react(this.post.id, r);
    } catch {
      alert('Reaction failed (rolled back).');
    }
  }
}
