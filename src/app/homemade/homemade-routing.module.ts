import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HmDatatableComponent } from './hm-datatable/hm-datatable.component';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search-async/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm.dropdown.search.component';
import { HmSpinnerComponent } from './hm-spinner/hm-spinner.component';

const routes: Routes = [
  { path: 'hm/hm-dropdown-search', component: HomeMadeDropdownSearchComponent },
  { path: 'hm/hm-dropdown-search-async', component: HomeMadeDropdownSearchAsyncComponent },
  { path: 'hm/hm-spinner', component: HmSpinnerComponent },
  { path: 'hm/hm-datatable', component: HmDatatableComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMadeRoutingModule {}
