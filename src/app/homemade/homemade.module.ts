import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'oops-lib002';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search-async/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm.dropdown.search.component';
import { HomeMadeRoutingModule } from './homemade-routing.module';
import { HomemadeComponent } from './homemade/homemade.component';
import { HmSpinnerComponent } from './hm-spinner/hm-spinner.component';
import { HmDatatable1Component } from './hm-datatable1/hm-datatable1.component';
import { HmDatatable2Component } from './hm-datatable2/hm-datatable2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HmDatatable3Component } from './hm-datatable3/hm-datatable3.component';
import { HmDatatable4Component } from './hm-datatable4/hm-datatable4.component';
import { HmDatatable5Component } from './hm-datatable5/hm-datatable5.component';
import { HomeMadeDropdownSearchAsyncComponent2 } from './hm-dropdown-search-async2/hm.dropdown.search.async.component2';
import { HomeMadeSearchModalComponent } from './hm-search-modal/hm.search.modal.component';
import { HomeMadeSearchModalContentComponent } from './hm-search-modal/hm-search-modal-content/hm.search.modal.content.component';

@NgModule({
  declarations: [
    HomeMadeDropdownSearchComponent,
    HomeMadeDropdownSearchAsyncComponent,
    HomeMadeDropdownSearchAsyncComponent2,
    HomeMadeSearchModalComponent,
    HomeMadeSearchModalContentComponent,
    HomemadeComponent,
    HmSpinnerComponent,
    HmDatatable1Component,
    HmDatatable2Component,
    HmDatatable3Component,
    HmDatatable4Component,
    HmDatatable5Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule,
    HomeMadeRoutingModule,
  ],
  exports: [],
})
export class HomeMadeModule {}
