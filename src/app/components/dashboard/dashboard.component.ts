import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  posts: any[] = [];

  constructor(
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
        this.posts = data.map((e: any) => {
           return {
             id:e.payload.doc.id,
             ...e.payload.doc.data()
           } as Post;
      })
    });
  }
}
