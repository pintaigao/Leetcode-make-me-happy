import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../models';
import { PostCardComponent } from './post-card.component';
import { IntersectDirective } from '../intersect.directive';

@Component({
  selector: 'app-feed-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent, IntersectDirective],
  template: `
    <div class="stack">
      <app-post-card *ngFor="let p of items; trackBy: trackById" [post]="p" />

      <div
        class="sentinel"
        appIntersect
        [rootMargin]="'800px'"
        (intersect)="loadMore.emit()"
      ></div>
    </div>
  `,
})
export class FeedListComponent {
  @Input({ required: true }) items: Post[] = [];
  @Output() loadMore = new EventEmitter<void>();

  trackById(_: number, p: Post) {
    return p.id;
  }
}
