import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgbCarouselCycleComponent } from './pages/ngb-carousel-cycle/ngb.carousel.cycle.component';
import { NgbModalComponent } from './pages/ngb-modal/ngb.modal.component';
import { NgbTypeaheadFilterComponent } from './pages/ngb-typeahead-filter/ngb.typeahead.filter.component';
import { NgbTypeaheadSearchScrollableComponent } from './pages/ngb-typeahead-search-scrollable/ngb.typeahead.search.scrollable.component';
import { NgbTypeaheadSearchComponent } from './pages/ngb-typeahead-search/ngb.typeahead.search.component';
import { NgxSelect1Component } from './pages/ngx-select-1/ngx.select.1.component';
import { NgxSelect2Component } from './pages/ngx-select-2/ngx.select.2.component';
import { NgxSelect3Component } from './pages/ngx-select-3/ngx.select.3.component';
import { NgxTestComponent } from './pages/ngx-test/ngx.test.component';
import { NgxbTypeaheadSearchPreviewComponent } from './pages/ngxb-typeahead-search-preview/ngxb.typeahead.search.preview.component';
import { NgxbTypeaheadSearchComponent } from './pages/ngxb-typeahead-search/ngxb.typeahead.search.component';
import { TestAroundComponent } from './pages/test-around/test.around.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },
  { path: 'home/ngx-test', component: NgxTestComponent },
  { path: 'home/ngx-select-1', component: NgxSelect1Component },
  { path: 'home/ngx-select-2', component: NgxSelect2Component },
  { path: 'home/ngx-select-3', component: NgxSelect3Component },
  { path: 'home/ngb-typeahead-search', component: NgbTypeaheadSearchComponent },
  { path: 'home/ngb-typeahead-filter', component: NgbTypeaheadFilterComponent },
  {
    path: 'home/ngb-typeahead-search-scrollable',
    component: NgbTypeaheadSearchScrollableComponent,
  },
  {
    path: 'home/ngb-carousel-cycle',
    component: NgbCarouselCycleComponent,
  },
  { path: 'home/ngb-modal', component: NgbModalComponent },
  { path: 'home/ngxb-typeahead-search', component: NgxbTypeaheadSearchComponent },
  { path: 'home/ngxb-typeahead-search-preview', component: NgxbTypeaheadSearchPreviewComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    TestAroundComponent,
    NgxTestComponent,
    NgxSelect1Component,
    NgxSelect2Component,
    NgxSelect3Component,
    NgbTypeaheadSearchComponent,
    NgbTypeaheadSearchScrollableComponent,
    NgbModalComponent,
    NgbTypeaheadFilterComponent,
    NgxbTypeaheadSearchComponent,
    NgxbTypeaheadSearchPreviewComponent,
    NgbCarouselCycleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    NgxSelectModule,
    NgbTypeaheadModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot(),
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class HomeModule {}
