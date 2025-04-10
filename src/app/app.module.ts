import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplesModule } from './examples/eg.module';
import { GoToModule } from './gotos/goto.module';
import { HomeModule } from './home/home.module';
import { HomeMadeModule } from './homemade/homemade.module';
import { HtmlModule } from './html/html.module';
import { LocalsharedModule } from './localshared/localshared.module';
import { NgbTestModule } from './ngb/ngb.module';
import { NgxModule } from './ngx/ngx.module';
import { NgxbModule } from './ngxb/ngxb.module';

import localeFr from '@angular/common/locales/fr';
// registerLocaleData(localeDe);
registerLocaleData(localeFr);
// registerLocaleData(localeEn);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    HttpClientModule,
    // TranslateModule.forRoot(),
    OopsLib001Module,
    OopsLib002Module,
    SharedModule,
    LocalsharedModule,
    HomeModule,
    HomeMadeModule,
    HtmlModule,
    ExamplesModule,
    NgbTestModule,
    NgxModule,
    NgxbModule,
    BrowserAnimationsModule,
    GoToModule,
    AppRoutingModule, // need to be at last, otherwise NotFoundComponent is at front
  ],
  declarations: [AppComponent],
  exports: [],
  providers: [
    DecimalPipe,
    // RootMessageTranslatePipe,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpDelayInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
