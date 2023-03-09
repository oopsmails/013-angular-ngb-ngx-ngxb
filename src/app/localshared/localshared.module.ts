import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { DisplayFilteredComponent } from './components/display-filtered/display-filtered.component';
import { InputSearchableComponent } from './components/input-searchable/input-searchable.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, InputSearchableComponent, DisplayFilteredComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    HttpClientModule,
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
  ],
  exports: [SpinnerComponent, InputSearchableComponent, DisplayFilteredComponent],
})
export class LocalsharedModule {}
