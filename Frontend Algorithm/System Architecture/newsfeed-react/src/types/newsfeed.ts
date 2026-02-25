export type User = {
  id: string;
  name: string;
  profilePhotoUrl: string;
};

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export type Reactions = {
  // total counts
  counts: Record<ReactionType, number>;
  // the current user's reaction if any
  viewerReaction: ReactionType | null;
};

export type Post = {
  id: string;
  createdTime: number; // epoch ms
  content: string;
  author: User;
  imageUrl?: string;
  reactions: Reactions;
};

export type FeedPage = {
  posts: Post[];
  cursor: string | null; // cursor for next page
};

export type CreatePostInput = {
  message: string;
  imageUrl?: string;
};
