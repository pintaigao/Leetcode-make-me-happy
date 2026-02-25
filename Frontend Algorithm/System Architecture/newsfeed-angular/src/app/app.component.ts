import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <div class="header">
        <div>
          <div class="h1">News Feed</div>
          <div class="sub">Angular + cursor pagination + optimistic updates</div>
        </div>
        <div class="badge">Mock API: /api/*</div>
      </div>

      <router-outlet />
    </div>
  `,
})
export class AppComponent {}
