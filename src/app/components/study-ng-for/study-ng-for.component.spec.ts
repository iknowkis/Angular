import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyNgForComponent } from './study-ng-for.component';

describe('StudyNgForComponent', () => {
  let component: StudyNgForComponent;
  let fixture: ComponentFixture<StudyNgForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyNgForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyNgForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
