import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxSelectModule } from 'ngx-select-ex';
import { SharedModule } from 'oops-lib002';
import { NgxbHomeComponent } from './ngxb-home/ngxb-home.component';
import { NgxbRoutingModule } from './ngxb-routing.module';
import { NgxbTypeaheadSearchPreviewComponent } from './ngxb-typeahead-search-preview/ngxb.typeahead.search.preview.component';
import { NgxbTypeaheadSearchComponent } from './ngxb-typeahead-search/ngxb.typeahead.search.component';

// const routes: Routes = [
//   { path: 'home/ngxb-typeahead-search', component: NgxbTypeaheadSearchComponent },
//   { path: 'home/ngxb-typeahead-search-preview', component: NgxbTypeaheadSearchPreviewComponent },
// ];

@NgModule({
  declarations: [
    NgxbTypeaheadSearchComponent,
    NgxbTypeaheadSearchPreviewComponent,
    NgxbHomeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
