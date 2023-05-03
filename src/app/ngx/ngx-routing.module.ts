import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxForm1ListComponent } from './ngx-form1/ngx.form1.list.component';
import { NgxSearchPaginationComponent } from './ngx-search-pagination/ngx-search-pagination.component';
import { NgxSelect1Component } from './ngx-select-1/ngx.select.1.component';
import { NgxSelect2Component } from './ngx-select-2/ngx.select.2.component';
import { NgxSelect3Component } from './ngx-select-3/ngx.select.3.component';
import { NgxSelectDropdown1Component } from './ngx-select-dropdown1/ngx-select-dropdown1.component';
import { NgxTestComponent } from './ngx-test/ngx.test.component';
import { NgxSelect4Component } from './ngx-select-4/ngx.select.4.component';

const routes: Routes = [
  { path: 'ngx/ngx-test', component: NgxTestComponent },
  { path: 'ngx/ngx-select-1', component: NgxSelect1Component },
  { path: 'ngx/ngx-select-2', component: NgxSelect2Component },
  { path: 'ngx/ngx-select-3', component: NgxSelect3Component },
  { path: 'ngx/ngx-select-4', component: NgxSelect4Component },
  { path: 'ngx/ngx-search-gitrepos', component: NgxSearchPaginationComponent },
  { path: 'ngx/ngx-form1', component: NgxForm1ListComponent },
  { path: 'ngx/ngx-select-dropdown1', component: NgxSelectDropdown1Component },
];
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxSelectModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxRoutingModule {}
