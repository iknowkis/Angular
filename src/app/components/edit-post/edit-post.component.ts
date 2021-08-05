// import { Component, OnInit } from '@angular/core';
// import { PostService } from 'src/app/post.service';

// import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs/operators'

// import { Location } from '@angular/common';

// import { FormGroup, FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-edit-post',
//   templateUrl: './edit-post.component.html',
//   styleUrls: ['./edit-post.component.css']
// })
// export class EditPostComponent implements OnInit {
  
//   PostForm!: FormGroup; // !:
//   routeId = this.route.snapshot.paramMap.get('id');
//   selectedPost$ = this.route.params
//   .pipe(
//     switchMap((params) => this.postService.getSelectedPost(params.id))
//     );
              

//   constructor(
//     private postService: PostService,
//     private route: ActivatedRoute,
//     private location: Location) { }

//   ngOnInit(): void {
//   }
   
//   deleteFunc(id: any) {
//     this.postService.deletePost(id);
//   }

//   update(id: any, form: any) {
//     this.postService.updatePost(id, form.value);
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';

import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Location } from '@angular/common';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  
  PostForm!: FormGroup; // !:
  routeId = this.route.snapshot.paramMap.get('id');
  selectedPost$ = this.route.params
  .pipe(
    switchMap((params) => this.postService.getSelectedPost(params.id))
    );
              

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) { }

    private initForm() {
      this.PostForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'content': new FormControl(null, [Validators.required, Validators.maxLength(100)])
      });
    }
    
  ngOnInit(): void {
    this.initForm();
  }
   
  deleteFunc(id: any) {
    this.postService.deletePost(id);
  }

  update(id: any) {
    this.postService.updatePost(id, this.PostForm.value);
  }

  goBack(): void {
    this.location.back();
  }
}
