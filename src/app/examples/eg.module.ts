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
import { ExamplesSelectSublist1Component } from './eg-select-sublist/eg-select-sublist1/eg.select.sublist1.component';
import { ExamplesSelectSublist2Component } from './eg-select-sublist/eg-select-sublist2/eg.select.sublist2.component';
import { ExamplesSelectSublist3Component } from './eg-select-sublist/eg-select-sublist3/eg.select.sublist3.component';
import { ExamplesSelectSublist4Component } from './eg-select-sublist/eg-select-sublist4/eg.select.sublist4.component';
import { ExamplesSelectSublist5Component } from './eg-select-sublist/eg-select-sublist5/eg.select.sublist5.component';
import { ExamplesSelectSublist6Component } from './eg-select-sublist/eg-select-sublist6/eg.select.sublist6.component';
import { EgHighlishtComponent } from './eg-highlisht/eg-highlisht.component';
import { EgSaving01Component } from './eg-saving/eg.saving.01/eg.saving.01.component';
import { EgSaving02Component } from './eg-saving/eg.saving.02/eg.saving.02.component';

@NgModule({
  declarations: [
    ExamplesHomeComponent,
    ExamplesSelectComponent,
    ExamplesPatternComponent,
    ExampleInputValidateComponent,
    ExamplesSelectSublist1Component,
    ExamplesSelectSublist2Component,
    ExamplesSelectSublist3Component,
    ExamplesSelectSublist4Component,
    ExamplesSelectSublist5Component,
    ExamplesSelectSublist6Component,
    EgHighlishtComponent,
    EgSaving01Component,
    EgSaving02Component,
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
