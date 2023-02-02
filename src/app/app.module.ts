import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { HomeMadeModule } from './homemade/homemade.module';
import { NgbTestModule } from './ngb/ngb.module';
import { NgxModule } from './ngx/ngx.module';
import { NgxbModule } from './ngxb/ngxb.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    HttpClientModule,
    OopsLib001Module,
    SharedModule,
    CoreModule,
    HomeModule,
    HomeMadeModule,
    NgbTestModule,
    NgxModule,
    NgxbModule,
    BrowserAnimationsModule,
    AppRoutingModule, // need to be at last, otherwise NotFoundComponent is at front
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
