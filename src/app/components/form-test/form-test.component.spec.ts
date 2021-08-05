import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormTestComponent } from './form-test.component';

let component: FormTestComponent;
let fixture: ComponentFixture<FormTestComponent>;
let de: DebugElement
let el: HTMLElement;

describe('FormTestComponent', () => {
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [FormTestComponent]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(FormTestComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be valid`, () => {
    component.infoForms.controls[0].setValue('kim');
    // component.infoForms.controls['age'].setValue('28');
    // component.infoForms.controls['mobile'].setValue('010-1234-1234');
   });
  
  it(`form should be invalid`, () => {
    component.infoForms.controls[0].setValue('');
    // component.infoForms.controls['age'].setValue('');
    // component.infoForms.controls['mobile'].setValue('');
   });
  
})