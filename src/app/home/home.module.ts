import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
// import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { TestAroundComponent } from './pages/test-around/test.around.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },
];

@NgModule({
  declarations: [HomeComponent, TestAroundComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class HomeModule {}
