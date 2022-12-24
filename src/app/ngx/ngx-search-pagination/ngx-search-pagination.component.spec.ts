import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSearchPaginationComponent } from './ngx-search-pagination.component';

describe('NgxSearchPaginationComponent', () => {
  let component: NgxSearchPaginationComponent;
  let fixture: ComponentFixture<NgxSearchPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSearchPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSearchPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
