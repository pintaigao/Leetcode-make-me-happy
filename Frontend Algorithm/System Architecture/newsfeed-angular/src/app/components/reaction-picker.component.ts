import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reaction } from '../models';

const REACTIONS: { key: Reaction; label: string; emoji: string }[] = [
  { key: 'like', label: 'Like', emoji: '👍' },
  { key: 'love', label: 'Love', emoji: '❤️' },
  { key: 'haha', label: 'Haha', emoji: '😂' },
  { key: 'wow', label: 'Wow', emoji: '😮' },
  { key: 'sad', label: 'Sad', emoji: '😢' },
  { key: 'angry', label: 'Angry', emoji: '😡' },
];

@Component({
  selector: 'app-reaction-picker',
  standalone: true,
  template: `
    <div class="row" style="flex-wrap: wrap; gap: 8px;">
      <button
        class="pill"
        *ngFor="let r of reactions"
        (click)="pick.emit(r.key)"
        [class.on]="r.key === active"
        type="button"
      >
        <span>{{ r.emoji }}</span>
        <span>{{ r.label }}</span>
      </button>
      <button class="pill" type="button" (click)="pick.emit(null)" [class.on]="!active">
        ✖️ <span>Clear</span>
      </button>
    </div>
  `,
})
export class ReactionPickerComponent {
  @Input() active: Reaction | null | undefined = null;
  @Output() pick = new EventEmitter<Reaction | null>();
  reactions = REACTIONS;
}
