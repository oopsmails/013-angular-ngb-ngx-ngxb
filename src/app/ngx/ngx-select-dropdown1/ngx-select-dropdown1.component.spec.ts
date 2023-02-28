import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectDropdown1Component } from './ngx-select-dropdown1.component';

describe('NgxSelectDropdown1Component', () => {
  let component: NgxSelectDropdown1Component;
  let fixture: ComponentFixture<NgxSelectDropdown1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSelectDropdown1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSelectDropdown1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
