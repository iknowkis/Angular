// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidatorFn } from '@angular/forms';

// @Component({
//   selector: 'app-form-test',
//   templateUrl: './form-test.component.html',
//   styleUrls: ['./form-test.component.css']
// })

// export class FormTestComponent implements OnInit {

//   myForm!: FormGroup;
//   group!: FormGroup;
//   EmailregExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//   MobileRegExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
//   NumberRegExp = /^-?(0|[1-9]\d*)?$/;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.myForm = this.fb.group({
//       UserName: ['',
//       [
//         Validators.required,
//         Validators.minLength(2),
//         Validators.maxLength(10)
//       ]],
//       NumberOfRow: ['',
//       [
//         Validators.required,
//         Validators.max(30)
//       ]],
//       infoArray: this.fb.array([])
//     })
//   }

//   get infoForms() {
//     return this.myForm.get('infoArray') as FormArray
//   }

//   addInfo() {

//     const info = this.fb.group({
//       name: ['',
//         [
//           Validators.required,
//           // Validators.minLength(2),
//           // Validators.maxLength(10)
//         ]],
//       age: ['',
//         [
//           Validators.required,
//           // Validators.pattern(this.NumberRegExp)
//         ]],
//       mobile: ['',
//         [
//           Validators.required,
//           // Validators.pattern(this.MobileRegExp)
//         ]],
//     })

//     this.infoForms.push(info);

//     console.log('aaaa',this.infoForms.value)
//   }

//   deleteInfo(i: any) {
//     this.infoForms.removeAt(i)
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, } from '@angular/forms';

import { duplicatedFieldInNeighborFormValidator } from './duplicate/duplicate-from-paul';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})

export class FormTestComponent implements OnInit {

  myForm!: FormGroup;
  EmailregExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  MobileRegExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
  NumberRegExp = /^-?(0|[1-9]\d*)?$/;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      UserName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10)
        ]
      ],
      NumberOfRow: ['',
        [
          Validators.required,
          Validators.max(30)
        ]
      ],
      infoArray: this.fb.array([])
    });
  }

  get infoForms() {
    return this.myForm.get('infoArray') as FormArray
  }

  addInfo() {
    const info = this.fb.group({
      name: ['',
        [
          Validators.required, duplicatedFieldInNeighborFormValidator(this.infoForms, 'name'),
          Validators.minLength(2),
          Validators.maxLength(10),
        ]],
      age: ['',
        [
          Validators.required,
          Validators.pattern(this.NumberRegExp)
        ]],
      mobile: ['',
        [
          Validators.required,
          Validators.pattern(this.MobileRegExp)
        ]]
    })
    // 값 나오는 호출
    // this.infoForms.value[0].name
    // this.infoForms.value.at(0).name d
    // this.infoForms.at(0).value.name
    // this.infoForms.at(0).get('name')?.value
    // this.infoForms.controls[0].value.name
    this.infoForms.push(info);
  }

  deleteInfo(i: any) {
    this.infoForms.removeAt(i);
    this.infoForms.controls[0].get('name')?.updateValueAndValidity()  }


}
