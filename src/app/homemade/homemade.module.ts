import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { HomeMadeDropdownSearchAsyncComponent } from './hm-dropdown-search-async/hm.dropdown.search.async.component';
import { HomeMadeDropdownSearchComponent } from './hm-dropdown-search/hm.dropdown.search.component';

const routes: Routes = [
  { path: 'home/hm-dropdown-search', component: HomeMadeDropdownSearchComponent },
  { path: 'home/hm-dropdown-search-async', component: HomeMadeDropdownSearchAsyncComponent },
];

@NgModule({
  declarations: [HomeMadeDropdownSearchComponent, HomeMadeDropdownSearchAsyncComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot(),
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class HomeMadeModule {}
