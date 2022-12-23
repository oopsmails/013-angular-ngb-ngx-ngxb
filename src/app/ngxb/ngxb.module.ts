import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from '../shared/shared.module';
import { NgxbRoutingModule } from './ngxb-routing.module';
import { NgxbTypeaheadSearchPreviewComponent } from './ngxb-typeahead-search-preview/ngxb.typeahead.search.preview.component';
import { NgxbTypeaheadSearchComponent } from './ngxb-typeahead-search/ngxb.typeahead.search.component';
import { NgxbHomeComponent } from './ngxb-home/ngxb-home.component';

// const routes: Routes = [
//   { path: 'home/ngxb-typeahead-search', component: NgxbTypeaheadSearchComponent },
//   { path: 'home/ngxb-typeahead-search-preview', component: NgxbTypeaheadSearchPreviewComponent },
// ];

@NgModule({
  declarations: [NgxbTypeaheadSearchComponent, NgxbTypeaheadSearchPreviewComponent, NgxbHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    NgxSelectModule,
    NgbTypeaheadModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot(),
    SharedModule,
    // RouterModule.forChild(routes),
    NgxbRoutingModule,
  ],
  exports: [],
})
export class NgxbModule {}
