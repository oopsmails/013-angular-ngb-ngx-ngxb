import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from 'oops-lib002';
import { NgxForm1Component } from './ngx-form1/ngx.form1.component';
import { NgxForm1ListComponent } from './ngx-form1/ngx.form1.list.component';
import { NgxHomeComponent } from './ngx-home/ngx-home.component';
import { NgxRoutingModule } from './ngx-routing.module';
import { NgxSearchPaginationComponent } from './ngx-search-pagination/ngx-search-pagination.component';
import { NgxSelect1Component } from './ngx-select/ngx-select-1/ngx.select.1.component';
import { NgxSelect2Component } from './ngx-select/ngx-select-2/ngx.select.2.component';
import { NgxSelect3Component } from './ngx-select/ngx-select-3/ngx.select.3.component';
import { NgxTestComponent } from './ngx-test/ngx.test.component';
import { NgxSelectDropdown1Component } from './ngx-select-dropdown1/ngx-select-dropdown1.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSelect4Component } from './ngx-select/ngx-select-4/ngx.select.4.component';
import { NgxSelect5Component } from './ngx-select/ngx-select-5/ngx.select.5.component';
import { NgxSelect6Component } from './ngx-select/ngx-select6/ngx-select6.component';
import { NgxSelect7Component } from './ngx-select/ngx-select7/ngx-select7.component';
import { NgxSelect7ItemComponent } from './ngx-select/ngx-select7-item/ngx-select7-item.component';

@NgModule({
  declarations: [
    NgxTestComponent,
    NgxSelect1Component,
    NgxSelect2Component,
    NgxSelect3Component,
    NgxSelect4Component,
    NgxSelect5Component,
    NgxHomeComponent,
    NgxSearchPaginationComponent,
    NgxForm1Component,
    NgxForm1ListComponent,
    NgxSelectDropdown1Component,
    NgxSelect6Component,
    NgxSelect7Component,
    NgxSelect7ItemComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    NgxSelectModule,
    SelectDropDownModule,
    TranslateModule.forRoot(),
    NgxRoutingModule,
    NgxPaginationModule,
  ],
})
export class NgxModule {}
