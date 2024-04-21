import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();
  constructor(public http: HttpClient) { }

  url = "http://localhost:3000/api"
  getPost() {
    this.http.get<{ message: string, posts: Post[] }>(`${this.url}/posts`)
      .subscribe((postsData) => {
        this.posts = postsData.posts
        this.postUpdate.next([...this.posts])
      })
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content
    }
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }

}
