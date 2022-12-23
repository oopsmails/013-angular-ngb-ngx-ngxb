import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbCarouselCycleComponent } from './ngb-carousel-cycle/ngb.carousel.cycle.component';
import { NgbModalComponent } from './ngb-modal/ngb.modal.component';
import { NgbTypeaheadFilterComponent } from './ngb-typeahead-filter/ngb.typeahead.filter.component';
import { NgbTypeaheadSearchScrollableComponent } from './ngb-typeahead-search-scrollable/ngb.typeahead.search.scrollable.component';
import { NgbTypeaheadSearchComponent } from './ngb-typeahead-search/ngb.typeahead.search.component';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgbRoutingModule {}
