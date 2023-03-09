import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HmDatatable1Component } from './hm-datatable1/hm-datatable1.component';
import { HmDatatable2Component } from './hm-datatable2/hm-datatable2.component';
import { HmDatatable3Component } from './hm-datatable3/hm-datatable3.component';
import { HmDatatable4Component } from './hm-datatable4/hm-datatable4.component';
import { HmDatatable5Component } from './hm-datatable5/hm-datatable5.component';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search-async/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchAsyncComponent2 } from './hm-dropdown-search-async2/hm.dropdown.search.async.component2';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm.dropdown.search.component';
import { HmSpinnerComponent } from './hm-spinner/hm-spinner.component';

const routes: Routes = [
  { path: 'hm/hm-dropdown-search', component: HomeMadeDropdownSearchComponent },
  { path: 'hm/hm-dropdown-search-async', component: HomeMadeDropdownSearchAsyncComponent },
  { path: 'hm/hm-dropdown-search-async2', component: HomeMadeDropdownSearchAsyncComponent2 },
  { path: 'hm/hm-spinner', component: HmSpinnerComponent },
  { path: 'hm/hm-datatable1', component: HmDatatable1Component },
  { path: 'hm/hm-datatable2', component: HmDatatable2Component },
  { path: 'hm/hm-datatable3', component: HmDatatable3Component },
  { path: 'hm/hm-datatable4', component: HmDatatable4Component },
  { path: 'hm/hm-datatable5', component: HmDatatable5Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMadeRoutingModule {}
