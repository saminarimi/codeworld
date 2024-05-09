import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsub: Subscription;

  constructor(public postService: PostService) { }

  identify(index: number, post: any) {
    return post.ExternalId;   // this is the unique id 
  }
  ngOnInit() {
    this.postService.getPost();
    this.postsub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    this.postsub.unsubscribe();
  }
}
