import { http, HttpResponse, delay } from 'msw'

type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry'

export interface Author {
  id: string
  name: string
  avatarUrl: string
}

export interface ReactionSummary {
  type: ReactionType
  count: number
  reactedByMe: boolean
}

export interface Post {
  id: string
  author: Author
  content: string
  createdAt: string
  reactions: ReactionSummary[]
}

export interface FeedPage {
  items: Post[]
  nextCursor: string | null
}

const PAGE_SIZE_DEFAULT = 10

// --- In-memory "DB" ---
const authors: Author[] = [
  { id: 'u1', name: 'Ava Chen', avatarUrl: 'https://i.pravatar.cc/80?img=32' },
  { id: 'u2', name: 'Noah Patel', avatarUrl: 'https://i.pravatar.cc/80?img=12' },
  { id: 'u3', name: 'Mia Johnson', avatarUrl: 'https://i.pravatar.cc/80?img=47' },
  { id: 'u4', name: 'Leo García', avatarUrl: 'https://i.pravatar.cc/80?img=5' },
]

function nowIsoMinusMinutes(min: number) {
  return new Date(Date.now() - min * 60_000).toISOString()
}

function makePost(i: number): Post {
  const a = authors[i % authors.length]
  return {
    id: `p${i}`,
    author: a,
    content:
      i % 5 === 0
        ? 'Just shipped a small feature. Love iterative progress. 🚀'
        : i % 5 === 1
          ? 'Morning training + coffee. Consistency beats intensity.'
          : i % 5 === 2
            ? 'Question: what’s your go-to way to learn a new framework quickly?'
            : i % 5 === 3
              ? 'A quick reminder: write tests for the behavior, not implementation.'
              : 'Today I’m exploring system design: feed ranking, pagination, caching.',
    createdAt: nowIsoMinusMinutes(i * 7 + 3),
    reactions: [
      { type: 'like', count: Math.floor((i * 13) % 21), reactedByMe: false },
      { type: 'love', count: Math.floor((i * 7) % 12), reactedByMe: false },
      { type: 'laugh', count: Math.floor((i * 5) % 10), reactedByMe: false },
    ],
  }
}

// newest first (p1 is newest? we'll create p1..p120 and sort by createdAt desc)
let posts: Post[] = Array.from({ length: 120 }, (_, idx) => makePost(idx + 1)).sort(
  (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
)

function parseUrl(request: Request) {
  const url = new URL(request.url)
  return url
}

function encodeCursor(index: number) {
  return btoa(String(index))
}

function decodeCursor(cursor: string | null): number {
  if (!cursor) return 0
  try {
    const n = Number(atob(cursor))
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export const handlers = [
  // GET /api/feed?cursor=...&limit=10
  http.get('/api/feed', async ({ request }) => {
    const url = parseUrl(request)
    const cursor = url.searchParams.get('cursor')
    const limit = clamp(Number(url.searchParams.get('limit') ?? PAGE_SIZE_DEFAULT), 1, 30)

    const start = decodeCursor(cursor)
    const end = start + limit

    const items = posts.slice(start, end)
    const nextCursor = end < posts.length ? encodeCursor(end) : null

    // simulate latency
    await delay(250)
    const body: FeedPage = { items, nextCursor }
    return HttpResponse.json(body, { status: 200 })
  }),

  // POST /api/posts
  http.post('/api/posts', async ({ request }) => {
    const payload = (await request.json().catch(() => ({}))) as { content?: string; authorId?: string }
    const content = (payload.content ?? '').trim()
    if (!content) {
      return HttpResponse.json({ message: 'content is required' }, { status: 400 })
    }

    const author = authors.find((a) => a.id === payload.authorId) ?? authors[0]
    const newPost: Post = {
      id: `p${Math.floor(Math.random() * 1e9)}`,
      author,
      content,
      createdAt: new Date().toISOString(),
      reactions: [
        { type: 'like', count: 0, reactedByMe: false },
        { type: 'love', count: 0, reactedByMe: false },
        { type: 'laugh', count: 0, reactedByMe: false },
        { type: 'wow', count: 0, reactedByMe: false },
        { type: 'sad', count: 0, reactedByMe: false },
        { type: 'angry', count: 0, reactedByMe: false },
      ],
    }

    posts = [newPost, ...posts]
    await delay(300)
    return HttpResponse.json(newPost, { status: 201 })
  }),

  // POST /api/reactions  { postId, type }
  http.post('/api/reactions', async ({ request }) => {
    const payload = (await request.json().catch(() => ({}))) as { postId?: string; type?: ReactionType }
    const postId = payload.postId
    const type = payload.type

    if (!postId || !type) {
      return HttpResponse.json({ message: 'postId and type are required' }, { status: 400 })
    }

    const post = posts.find((p) => p.id === postId)
    if (!post) return HttpResponse.json({ message: 'not found' }, { status: 404 })

    const r = post.reactions.find((x) => x.type === type)
    if (!r) {
      post.reactions.push({ type, count: 1, reactedByMe: true })
    } else {
      // toggle
      if (r.reactedByMe) {
        r.reactedByMe = false
        r.count = Math.max(0, r.count - 1)
      } else {
        r.reactedByMe = true
        r.count += 1
      }
    }

    await delay(180)
    return HttpResponse.json({ ok: true }, { status: 200 })
  }),
]
