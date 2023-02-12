import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNgxSelectComponent } from './get-ngx-select.component';

describe('GetNgxSelectComponent', () => {
  let component: GetNgxSelectComponent;
  let fixture: ComponentFixture<GetNgxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNgxSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetNgxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
