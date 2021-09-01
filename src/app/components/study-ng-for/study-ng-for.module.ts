import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyNgForComponent } from './study-ng-for.component';
import { DragulaModule } from 'ng2-dragula';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [

    StudyNgForComponent,
    
  ],
  imports: [
    CommonModule,
    DragulaModule.forRoot(),
    FormsModule,


  ],
  exports: [
    StudyNgForComponent
  ]
})
export class StudyNgForModule { }
