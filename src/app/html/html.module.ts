import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'oops-lib002';
import { LocalsharedModule } from '../localshared/localshared.module';
import { HtmlHomeComponent } from './html-home/html-home.component';
import { HtmlRoutingModule } from './html-routing.module';
import { HtmlTestComponent } from './html-test/html-test.component';

@NgModule({
  declarations: [HtmlHomeComponent, HtmlTestComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule,
    LocalsharedModule,
    HtmlRoutingModule,
  ],
})
export class HtmlModule {}
