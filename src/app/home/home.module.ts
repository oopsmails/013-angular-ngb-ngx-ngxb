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
import { TestAroundComponent } from './pages/test-around/test.around.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },

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
];

@NgModule({
  declarations: [
    HomeComponent,
    TestAroundComponent,

    NgbTypeaheadSearchComponent,
    NgbTypeaheadSearchScrollableComponent,
    NgbModalComponent,
    NgbTypeaheadFilterComponent,
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
