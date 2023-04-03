import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbCarouselCycleComponent } from './ngb-carousel-cycle/ngb.carousel.cycle.component';
import { NgbModalComponent } from './ngb-modal/ngb.modal.component';
import { NgbSpinnerComponent } from './ngb-spinner/ngb-spinner.component';
import { NgbTabComponent } from './ngb-tab/ngb-tab.component';
import { NgbTab2Component } from './ngb-tab2/ngb-tab2.component';
import { NgbTableComponent } from './ngb-table/ngb-table.component';
import { NgbTooltipComponent } from './ngb-tooltip/ngb.tooltip.component';
import { NgbTypeaheadFilterComponent } from './ngb-typeahead-filter/ngb.typeahead.filter.component';
import { NgbTypeaheadSearchScrollableComponent } from './ngb-typeahead-search-scrollable/ngb.typeahead.search.scrollable.component';
import { NgbTypeaheadSearchComponent } from './ngb-typeahead-search/ngb.typeahead.search.component';

const routes: Routes = [
  { path: 'ngb/ngb-typeahead-search', component: NgbTypeaheadSearchComponent },
  { path: 'ngb/ngb-typeahead-filter', component: NgbTypeaheadFilterComponent },
  {
    path: 'ngb/ngb-typeahead-search-scrollable',
    component: NgbTypeaheadSearchScrollableComponent,
  },
  {
    path: 'ngb/ngb-carousel-cycle',
    component: NgbCarouselCycleComponent,
  },
  { path: 'ngb/ngb-modal', component: NgbModalComponent },
  { path: 'ngb/ngb-spinner', component: NgbSpinnerComponent },
  { path: 'ngb/ngb-table', component: NgbTableComponent },
  { path: 'ngb/ngb-tab', component: NgbTabComponent },
  { path: 'ngb/ngb-tab2', component: NgbTab2Component },
  { path: 'ngb/ngb-tooltip', component: NgbTooltipComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgbRoutingModule {}
