# News Feed (Facebook-like) – React Study Project

This is a **self-contained** React + Vite project that implements a simplified Facebook/Twitter-style news feed UI, following the **Requirements exploration** section from GreatFrontEnd’s “News Feed (e.g. Facebook)” system design prompt.

Implemented scope (matching the core features):
- Browse a feed containing posts (text + optional image)
- React to posts (Like + multiple reactions)
- Create & publish new posts
- Infinite scrolling (cursor-based pagination)

Out of scope (intentionally disabled in UI):
- Commenting
- Sharing

## Key ideas to study
- **Cursor-based pagination** for feeds (stable, avoids duplicates vs offset pagination)
- **Infinite scroll** using `IntersectionObserver` (prefetch before bottom via `rootMargin`)
- **Client store** via React Query cache (server-originated data)
- **Optimistic updates** for reactions
- **Lazy-loaded** reaction picker (code-splitting)
- **Scroll position preservation** in `sessionStorage`
- **Stale feed prompt** (refresh banner)

## Mock backend
The project uses **MSW (Mock Service Worker)** in development mode to simulate HTTP endpoints:
- `GET /api/feed?cursor=...&limit=...`
- `POST /api/posts`
- `POST /api/posts/:id/reactions`

Data is stored in-memory in `src/mocks/db.ts`.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Where to look
- Infinite feed query: `src/store/useInfiniteFeed.ts`
- Infinite scroll sentinel: `src/lib/useIntersection.ts`
- Feed UI: `src/components/FeedList.tsx`
- Post UI: `src/components/PostCard.tsx`
- Reactions + optimistic updates: `src/components/ReactionButton.tsx`
- Post creation: `src/components/PostComposer.tsx`
- Mock APIs: `src/mocks/*`
