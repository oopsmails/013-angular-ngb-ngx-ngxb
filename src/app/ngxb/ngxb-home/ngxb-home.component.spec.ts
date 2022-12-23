import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxbHomeComponent } from './ngxb-home.component';

describe('NgxbHomeComponent', () => {
  let component: NgxbHomeComponent;
  let fixture: ComponentFixture<NgxbHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxbHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxbHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
