import { LocalsharedModule } from './../localshared/localshared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'oops-lib002';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search/hm-dropdown-search-async1/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm-dropdown-search1/hm.dropdown.search.component';
import { HomeMadeRoutingModule } from './homemade-routing.module';
import { HomemadeComponent } from './homemade/homemade.component';
import { HmSpinnerComponent } from './hm-spinner/hm-spinner.component';
import { HmDatatable1Component } from './hm-datatable/hm-datatable1/hm-datatable1.component';
import { HmDatatable2Component } from './hm-datatable/hm-datatable2/hm-datatable2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HmDatatable3Component } from './hm-datatable/hm-datatable3/hm-datatable3.component';
import { HmDatatable4Component } from './hm-datatable/hm-datatable4/hm-datatable4.component';
import { HmDatatable5Component } from './hm-datatable/hm-datatable5/hm-datatable5.component';
import { HomeMadeDropdownSearchAsyncComponent2 } from './hm-dropdown-search/hm-dropdown-search-async2/hm.dropdown.search.async.component2';
import { HomeMadeSearchModalComponent } from './hm-search-modal/hm.search.modal.component';
import { HomeMadeSearchModalContentComponent } from './hm-search-modal/hm-search-modal-content/hm.search.modal.content.component';
import { HomeMadeDragAndDropFileComponent } from './hm-dnd-file/hm.dnd.file.component';
import { HomeMadeDragAndDropComponent } from './hm-dnd/hm.dnd.component';
import { HmDatatable6Component } from './hm-datatable/hm-datatable6/hm-datatable6.component';
import { HmDatatable7Component } from './hm-datatable/hm-datatable7/hm-datatable7.component';
import { HmDatatable8Component } from './hm-datatable/hm-datatable8/hm-datatable8.component';
import { HomeMadeEditableComponent } from './hm-editable/hm.editable.component';
import { HomeMadeDropdownSearchAsyncComponent3 } from './hm-dropdown-search/hm-dropdown-search-async3/hm.dropdown.search.async.component3';
import { HmDropdownSearch2Component } from './hm-dropdown-search/hm-dropdown-search2/hm-dropdown-search2.component';

@NgModule({
  declarations: [
    HomeMadeDropdownSearchComponent,
    HomeMadeDropdownSearchAsyncComponent,
    HomeMadeDropdownSearchAsyncComponent2,
    HomeMadeDropdownSearchAsyncComponent3,
    HomeMadeSearchModalComponent,
    HomeMadeSearchModalContentComponent,
    HomemadeComponent,
    HmSpinnerComponent,
    HmDatatable1Component,
    HmDatatable2Component,
    HmDatatable3Component,
    HmDatatable4Component,
    HmDatatable5Component,
    HmDatatable6Component,
    HmDatatable7Component,
    HmDatatable8Component,
    HomeMadeDragAndDropFileComponent,
    HomeMadeDragAndDropComponent,
    HomeMadeEditableComponent,
    HmDropdownSearch2Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule,
    LocalsharedModule,
    HomeMadeRoutingModule,
  ],
  exports: [],
})
export class HomeMadeModule {}
