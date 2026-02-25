import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedStore } from '../feed-store.service';

@Component({
  selector: 'app-post-composer',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card">
      <div class="stack">
        <textarea
          [(ngModel)]="text"
          placeholder="What's on your mind?"
        ></textarea>
        <div class="row" style="justify-content: space-between;">
          <div class="sub">New post appears on top (optimistic).</div>
          <button class="primary" [disabled]="store.loading() || !text.trim()" (click)="submit()">
            Post
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PostComposerComponent {
  text = '';
  constructor(public store: FeedStore) {}

  async submit() {
    const t = this.text;
    this.text = '';
    try {
      await this.store.createPost(t);
    } catch {
      // If you want: toast
      alert('Create post failed (rolled back).');
    }
  }
}
