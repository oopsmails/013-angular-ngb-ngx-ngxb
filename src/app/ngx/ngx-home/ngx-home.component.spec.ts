import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHomeComponent } from './ngx-home.component';

describe('NgxHomeComponent', () => {
  let component: NgxHomeComponent;
  let fixture: ComponentFixture<NgxHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
