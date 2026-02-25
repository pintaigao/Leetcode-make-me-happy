# News Feed (Angular)

Angular implementation of the “Facebook News Feed” system design UI slice (requirements exploration):
- View feed (cursor-based pagination)
- Create post (optimistic insert)
- Reactions (optimistic update + rollback)
- Infinite scroll (IntersectionObserver sentinel)
- Mock backend (Angular In-memory Web API)

## Run

```bash
npm install
npm start
```

Open: http://localhost:4200

## Key files
- Cursor pagination API: `src/app/feed-api.service.ts`
- State + optimistic updates: `src/app/feed-store.service.ts`
- Infinite scroll directive: `src/app/intersect.directive.ts`
- Mock backend: `src/mock/in-memory-feed.service.ts`



## MSW (Mock Service Worker)

This project uses MSW in development to mock `/api/*` requests by registering `mockServiceWorker.js`.

- After `npm install`, MSW will generate `src/mockServiceWorker.js` automatically because `package.json` contains `msw.workerDirectory` (recommended by MSW docs).
- If you still don't see it, run:

```bash
npm run mock:init
```

Then restart `npm start` and verify `http://localhost:4200/mockServiceWorker.js` returns JavaScript.
