import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../shared/shared.module';
import { NgxRoutingModule } from './ngx-routing.module';
import { NgxSelect1Component } from './ngx-select-1/ngx.select.1.component';
import { NgxSelect2Component } from './ngx-select-2/ngx.select.2.component';
import { NgxSelect3Component } from './ngx-select-3/ngx.select.3.component';
import { NgxTestComponent } from './ngx-test/ngx.test.component';
import { NgxHomeComponent } from './ngx-home/ngx-home.component';
import { NgxSearchPaginationComponent } from './ngx-search-pagination/ngx-search-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    NgxTestComponent,
    NgxSelect1Component,
    NgxSelect2Component,
    NgxSelect3Component,
    NgxHomeComponent,
    NgxSearchPaginationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    NgxSelectModule,
    TranslateModule.forRoot(),
    NgxRoutingModule,
    NgxPaginationModule,
  ],
})
export class NgxModule {}
