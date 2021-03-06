import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';

import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Location } from '@angular/common';

import { Comments } from 'src/app/item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  
  EmojiChars = ["ðķ","ðą","ð­","ðđ","ðĶ","ðĶ","ðļ","ðĶ","ðŊ","ðĶ",
  "ðŪ","ð·","ðĨ","ð·","ðĶ","ðĶ","ðī","ðĒ","ð","ð",
  "ðĩ","ð","ð§","ðĶ","ð","ðŋ","ðĶ","ð","ðĶ","ðĶ",
  "ðŠ","ðĶ","ðĶ","ðĶĒ","ð","ðĶ"];

  routeId = this.route.snapshot.paramMap.get('id');
  
  selectedPost$ = this.route.params
  .pipe(
    switchMap((params) => this.postService.getSelectedPost(params.id))
  );

  comments: any[] = [];
  
    constructor(    
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) {
    }

    deletePostFunc(id: any) {
      this.postService.deletePost(id);
    }
    
    goBack(): void {
      this.location.back();
    }

    CommentSubmit(id: any, form: NgForm) {
      this.postService.AddComment(id,form.value);
    }

    deleteCommentFunc(PostId: any, CommentId: any) {
      this.postService.deleteComment(PostId,CommentId);
    }

    getRandomString(str: string) {
      var FirstNum = str.substr(0,1);
      return this.EmojiChars[parseInt(FirstNum,36)]; // íęļ ëĢėė ëė ėëëëĄëĄ ėė  íė
      
      // var RandomNumber = [Array(1)].map(i=>(~~(Math.random()*randomChars.length))).join('');
      // return randomChars[parseInt(RandomNumber)];
      // return randomChars[n];
    }
    
    ngOnInit() {
      
      this.postService.getComments(this.routeId).subscribe(data => {
        this.comments = data.map((e: any) => {
          return {
            id:e.payload.doc.id,
            ...e.payload.doc.data()
          } as Comments;
        })
      });
    }
}