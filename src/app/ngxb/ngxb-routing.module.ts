import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxbTypeaheadSearchPreviewComponent } from './ngxb-typeahead-search-preview/ngxb.typeahead.search.preview.component';
import { NgxbTypeaheadSearchComponent } from './ngxb-typeahead-search/ngxb.typeahead.search.component';

const routes: Routes = [
  { path: 'ngxb/ngxb-typeahead-search', component: NgxbTypeaheadSearchComponent },
  { path: 'ngxb/ngxb-typeahead-search-preview', component: NgxbTypeaheadSearchPreviewComponent },
];
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class NgxbRoutingModule {}
