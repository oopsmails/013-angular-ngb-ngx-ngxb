import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search-async/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm.dropdown.search.component';

const routes: Routes = [
  { path: 'hm/hm-dropdown-search', component: HomeMadeDropdownSearchComponent },
  { path: 'hm/hm-dropdown-search-async', component: HomeMadeDropdownSearchAsyncComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMadeRoutingModule {}
