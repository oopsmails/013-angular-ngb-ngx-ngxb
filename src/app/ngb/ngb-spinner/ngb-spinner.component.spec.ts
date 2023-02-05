import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbSpinnerComponent } from './ngb-spinner.component';

describe('NgbSpinnerComponent', () => {
  let component: NgbSpinnerComponent;
  let fixture: ComponentFixture<NgbSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgbSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
