import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { LocalsharedModule } from '../localshared/localshared.module';
import { GoTo1Component } from './goto1/goto1.component';

const routes: Routes = [{ path: 'goto/1', component: GoTo1Component }];
@NgModule({
  imports: [
    // CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
    // LocalsharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class GoToRoutingModule {}
