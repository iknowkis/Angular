
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { duplicatedFieldInNeighborFormValidator } from './duplicate-from-paul';



describe('duplicate-from-paul', () => {
  
  

  let str : string;
  
  })


  // 1. two duplicates returns error
  beforeEach(() => {
    //초기값 세팅

  })

  it(`should return an error if there is a duplicate`, () => {
    
    let myForm: FormGroup;



    const ctrl = ar.get('0.fireld') as AbstractControl


    //
    //
    //
    const error = duplicatedFieldInNeighborFormValidator(ar,'name')
    expect(error).toBeTruthy();

    ar.controls[0].setValue('kim');


  });
  


