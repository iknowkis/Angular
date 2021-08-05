import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTestComponent } from './form-test.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Infor } from 'src/app/post.model';

@NgModule({
  declarations: [
    FormTestComponent,
    Infor
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [FormTestComponent]
})
export class FormTestModule { }
