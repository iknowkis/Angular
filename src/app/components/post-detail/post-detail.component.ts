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
  
  EmojiChars = ["🐶","🐱","🐭","🐹","🦍","🦊","🐸","🦓","🐯","🦁",
  "🐮","🐷","🐥","🕷","🦅","🦉","🐴","🐢","🐍","🐙",
  "🐵","🐔","🐧","🦈","🐊","🐿","🦔","🐘","🦛","🦏",
  "🐪","🦚","🦜","🦢","🐇","🦝"];

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
      return this.EmojiChars[parseInt(FirstNum,36)]; // 한글 넣었을 때에 작동되로록 수정 필요
      
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