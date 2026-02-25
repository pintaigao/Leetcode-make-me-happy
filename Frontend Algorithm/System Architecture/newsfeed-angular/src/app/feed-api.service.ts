import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedPage, Post, Reaction } from './models';

@Injectable({ providedIn: 'root' })
export class FeedApiService {
  constructor(private http: HttpClient) {}

  getFeed(cursor: string | null, limit = 10): Observable<FeedPage> {
    let params = new HttpParams().set('limit', String(limit));
    if (cursor) params = params.set('cursor', cursor);
    return this.http.get<FeedPage>('/api/feed', { params });
  }

  createPost(content: string): Observable<Post> {
    return this.http.post<Post>('/api/posts', { content });
  }

  react(postId: string, reaction: Reaction | null): Observable<Post> {
    return this.http.post<Post>(`/api/posts/${postId}/reaction`, { reaction });
  }
}
