import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'oops-lib002';
import { LocalsharedModule } from './../localshared/localshared.module';
import { ExamplesHomeComponent } from './eg-home/eg.home.component';
import { ExamplesRoutingModule } from './eg-routing.module';
import { ExamplesSelectComponent } from './eg-select/eg.select.component';
import { ExamplesPatternComponent } from './eg-pattern/eg.pattern.component';
import { ExampleInputValidateComponent } from './eg-input-validate/eg.input.validate.component';

@NgModule({
  declarations: [
    ExamplesHomeComponent,
    ExamplesSelectComponent,
    ExamplesPatternComponent,
    ExampleInputValidateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule,
    LocalsharedModule,
    ExamplesRoutingModule,
  ],
  exports: [],
})
export class ExamplesModule {}
