import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSelect1Component } from './ngx-select-1/ngx.select.1.component';
import { NgxSelect2Component } from './ngx-select-2/ngx.select.2.component';
import { NgxSelect3Component } from './ngx-select-3/ngx.select.3.component';
import { NgxTestComponent } from './ngx-test/ngx.test.component';

const routes: Routes = [
  { path: 'home/ngx-test', component: NgxTestComponent },
  { path: 'home/ngx-select-1', component: NgxSelect1Component },
  { path: 'home/ngx-select-2', component: NgxSelect2Component },
  { path: 'home/ngx-select-3', component: NgxSelect3Component },
];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class NgxRoutingModule {}