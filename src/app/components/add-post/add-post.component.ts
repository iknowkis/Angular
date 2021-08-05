// import { Component, OnInit } from '@angular/core';
// import { PostService } from 'src/app/post.service';

// import { Location } from '@angular/common';

// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-add-post',
//   templateUrl: './add-post.component.html',
//   styleUrls: ['./add-post.component.css']
// })
// export class AddPostComponent implements OnInit {

//   constructor(
//     private postService: PostService,
//     private location: Location) {}

//   ngOnInit(): void {
//   }

//   onSubmit(form: NgForm) {
//     this.postService.createPost(form.value);
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';

import { Location } from '@angular/common';

import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  PostForm!: FormGroup; // !:

  MobileRegExp =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

  constructor(
    private postService: PostService,
    private location: Location,
    private formBuilder: FormBuilder) {}

    private initForm() {
      this.PostForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'content': new FormControl(null, [Validators.required, Validators.maxLength(100)])
      });
    }

  ngOnInit(): void {
    this.initForm();
    this.PostForm = this.formBuilder.group(
      {
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
            forbiddenNameValidator(/fuck/),
            forbiddenNameValidator(/shit/),
            forbiddenNameValidator(/ass/)
          ]
        ],
        content: ['',
        [
        Validators.required,
        Validators.maxLength(150)
        ]
        ],
        mobile: ['',
        [
        Validators.required
        ]
      ]
    })}

  onSubmit() {
    console.log('dddddd',this.PostForm.value);
    this.postService.createPost(this.PostForm.value);
  }

  goBack(): void {
    this.location.back();
  }

  alert() {
    window.alert("hi");
  }
}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}