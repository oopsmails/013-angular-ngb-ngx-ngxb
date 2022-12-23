import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from '../shared/shared.module';
import { NgbCarouselCycleComponent } from './ngb-carousel-cycle/ngb.carousel.cycle.component';
import { NgbModalComponent } from './ngb-modal/ngb.modal.component';
import { NgbRoutingModule } from './ngb-routing.module';
import { NgbTypeaheadFilterComponent } from './ngb-typeahead-filter/ngb.typeahead.filter.component';
import { NgbTypeaheadSearchScrollableComponent } from './ngb-typeahead-search-scrollable/ngb.typeahead.search.scrollable.component';
import { NgbTypeaheadSearchComponent } from './ngb-typeahead-search/ngb.typeahead.search.component';

@NgModule({
  declarations: [
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
    SharedModule,
    NgbTypeaheadModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot(),
    NgbRoutingModule,
  ],
})
export class NgbTestModule {}
