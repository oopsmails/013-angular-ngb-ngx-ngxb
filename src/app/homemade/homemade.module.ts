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

@NgModule({
  declarations: [
    HomeMadeDropdownSearchComponent,
    HomeMadeDropdownSearchAsyncComponent,
    HomemadeComponent,
    HmSpinnerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    TranslateModule.forRoot(),
    SharedModule,
    HomeMadeRoutingModule,
  ],
  exports: [],
})
export class HomeMadeModule {}
