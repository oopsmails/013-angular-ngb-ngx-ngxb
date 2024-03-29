import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HmDatatable1Component } from './hm-datatable/hm-datatable1/hm-datatable1.component';
import { HmDatatable2Component } from './hm-datatable/hm-datatable2/hm-datatable2.component';
import { HmDatatable3Component } from './hm-datatable/hm-datatable3/hm-datatable3.component';
import { HmDatatable4Component } from './hm-datatable/hm-datatable4/hm-datatable4.component';
import { HmDatatable5Component } from './hm-datatable/hm-datatable5/hm-datatable5.component';
import { HmDatatable6Component } from './hm-datatable/hm-datatable6/hm-datatable6.component';
import { HmDatatable7Component } from './hm-datatable/hm-datatable7/hm-datatable7.component';
import { HmDatatable8Component } from './hm-datatable/hm-datatable8/hm-datatable8.component';
import { HomeMadeDragAndDropFileComponent } from './hm-dnd-file/hm.dnd.file.component';
import { HomeMadeDragAndDropComponent } from './hm-dnd/hm.dnd.component';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search/hm-dropdown-search-async1/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchAsyncComponent2 } from './hm-dropdown-search/hm-dropdown-search-async2/hm.dropdown.search.async.component2';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm-dropdown-search1/hm.dropdown.search.component';
import { HomeMadeEditableComponent } from './hm-editable/hm.editable.component';
import { HomeMadeSearchModalComponent } from './hm-search-modal/hm.search.modal.component';
import { HmSpinnerComponent } from './hm-spinner/hm-spinner.component';
import { HomeMadeDropdownSearchAsyncComponent3 } from './hm-dropdown-search/hm-dropdown-search-async3/hm.dropdown.search.async.component3';
import { HmDropdownSearch2Component } from './hm-dropdown-search/hm-dropdown-search2/hm-dropdown-search2.component';

const routes: Routes = [
  { path: 'hm/hm-dropdown-search', component: HomeMadeDropdownSearchComponent },
  { path: 'hm/hm-dropdown-search2', component: HmDropdownSearch2Component },
  { path: 'hm/hm-dropdown-search-async', component: HomeMadeDropdownSearchAsyncComponent },
  { path: 'hm/hm-dropdown-search-async2', component: HomeMadeDropdownSearchAsyncComponent2 },
  { path: 'hm/hm-dropdown-search-async3', component: HomeMadeDropdownSearchAsyncComponent3 },
  { path: 'hm/hm-search-modal', component: HomeMadeSearchModalComponent },
  { path: 'hm/hm-spinner', component: HmSpinnerComponent },
  { path: 'hm/hm-datatable1', component: HmDatatable1Component },
  { path: 'hm/hm-datatable2', component: HmDatatable2Component },
  { path: 'hm/hm-datatable3', component: HmDatatable3Component },
  { path: 'hm/hm-datatable4', component: HmDatatable4Component },
  { path: 'hm/hm-datatable5', component: HmDatatable5Component },
  { path: 'hm/hm-datatable6', component: HmDatatable6Component },
  { path: 'hm/hm-datatable7', component: HmDatatable7Component },
  { path: 'hm/hm-datatable8', component: HmDatatable8Component },
  { path: 'hm/hm-dnd-file', component: HomeMadeDragAndDropFileComponent },
  { path: 'hm/hm-dnd', component: HomeMadeDragAndDropComponent },
  { path: 'hm/hm-editable', component: HomeMadeEditableComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMadeRoutingModule {}
