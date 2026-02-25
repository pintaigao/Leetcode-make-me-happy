import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { InMemoryFeedService } from './mock/in-memory-feed.service';
async function enableMocking() {
  if (!environment.mocks) return
  const { worker } = await import('./mocks/browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
    // Ensure correct URL when deploying under a base href
    serviceWorker: { url: `${(document.querySelector('base')?.getAttribute('href') ?? '/')}mockServiceWorker.js` },
  })
}

enableMocking().then(() => bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryFeedService, {
        apiBase: '/api/',
        delay: 350,
        passThruUnknownUrl: true,
      })
    ),
  ],
})).catch((err) => console.error(err));
