import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();
  constructor(public http: HttpClient) { }

  url = "http://localhost:3000/api"
  getPost() {
    this.http.get<{ message: string, posts: any[] }>(`http://localhost:3000/api/posts`)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedpost) => {
        this.posts = transformedpost
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
    this.http.post<{ message: "post added successfully" }>(`${this.url}/posts`, post).subscribe(response => {
      console.log(response.message);
      this.posts.push(post);
      this.postUpdate.next([...this.posts]);
    })

  }

}
