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

@NgModule({
  declarations: [
    HomeMadeDropdownSearchComponent,
    HomeMadeDropdownSearchAsyncComponent,
    HomemadeComponent,
    HmSpinnerComponent,
    HmDatatable1Component,
    HmDatatable2Component,
    HmDatatable3Component,
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
