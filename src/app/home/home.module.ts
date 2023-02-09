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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },
  { path: 'home/test-modal', component: TestModalComponent },
  { path: 'home/parent', component: ParentComponent },
  { path: 'home/get-ngx-select', component: GetNgxSelectComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    TestAroundComponent,
    TestModalComponent,
    ParentComponent,
    ChildComponent,
    GetNgxSelectComponent,
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
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class HomeModule {}
