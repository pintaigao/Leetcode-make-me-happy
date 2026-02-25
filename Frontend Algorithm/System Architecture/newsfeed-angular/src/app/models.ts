export type Reaction = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Author {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  createdAt: string; // ISO
  reactions: Record<Reaction, number>;
  myReaction?: Reaction | null;
}

export interface FeedPage {
  items: Post[];
  nextCursor: string | null;
}
