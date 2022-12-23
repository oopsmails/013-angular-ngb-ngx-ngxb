import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbHomeComponent } from './ngb-home.component';

describe('NgbHomeComponent', () => {
  let component: NgbHomeComponent;
  let fixture: ComponentFixture<NgbHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
