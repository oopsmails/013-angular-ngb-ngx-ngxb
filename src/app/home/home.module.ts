import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
// import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { TestAroundComponent } from './pages/test-around/test.around.component';
import { TestModalComponent } from './pages/test-modal/test-modal.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ChildComponent } from './pages/child/child.component';
import { GetNgxSelectComponent } from './pages/get-ngx-select/get-ngx-select.component';
import { SelectModalComponent } from './pages/select-modal/select-modal.component';
import { TestModalContentComponent } from './pages/test-modal/test-modal-content/test-modal-content.component';
import { LocalsharedModule } from '../localshared/localshared.module';
import { TestInputOutputComponent } from './pages/test-input-output/test.input.output.component';
import { HomeTable2Component } from './h-table2/h.table2.component';
import { HomeTable1Component } from './h-table1/h.table1.component';
import { HomeTable3Component } from './h-table3/h.table3.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },
  { path: 'home/test-modal', component: TestModalComponent },
  { path: 'home/test-inputoutput', component: TestInputOutputComponent },
  { path: 'home/parent', component: ParentComponent },
  { path: 'home/get-ngx-select', component: GetNgxSelectComponent },
  { path: 'home/select-modal', component: SelectModalComponent },
  { path: 'home/table1', component: HomeTable1Component },
  { path: 'home/table2', component: HomeTable2Component },
  { path: 'home/table3', component: HomeTable3Component },
];

@NgModule({
  declarations: [
    HomeComponent,
    TestAroundComponent,
    TestModalComponent,
    ParentComponent,
    ChildComponent,
    GetNgxSelectComponent,
    SelectModalComponent,
    TestModalContentComponent,
    TestInputOutputComponent,
    HomeTable1Component,
    HomeTable2Component,
    HomeTable3Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
    LocalsharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class HomeModule {}
