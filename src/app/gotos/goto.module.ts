import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { GoTo1Component } from './goto1/goto1.component';
import { GoTo2Component } from './goto2/goto2.component';
import { GoTo3Component } from './goto3/goto3.component';

const routes: Routes = [
  { path: 'goto/1', component: GoTo1Component },
  { path: 'goto/2', component: GoTo2Component },
  { path: 'goto/3', component: GoTo3Component },
];
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
  declarations: [GoTo3Component],
  exports: [RouterModule],
})
export class GoToModule {}
