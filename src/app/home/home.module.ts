import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSelectModule } from 'ngx-select-ex';
import { OopsLib001Module } from 'oops-lib001';
import { OopsLib002Module, SharedModule } from 'oops-lib002';
import { LocalsharedModule } from '../localshared/localshared.module';
import { HomeFlexComponent } from './h-layout/h-flex/h.flex.component';
import { HomeFlex2Component } from './h-layout/h-flex2/h.flex2.component';
import { HomeGridComponent } from './h-layout/h-grid/h.grid.component';
import { HomeGrid2Component } from './h-layout/h-grid2/h.grid2.component';
import { HomeGrid3Component } from './h-layout/h-grid3/h.grid3.component';
import { HomeOptionsComponent } from './h-options/home.options.component';
import { HomeProgressBarScrollComponent } from './h-progress-bar-scroll/h.progress.bar.scroll.component';
import { HomeRandomListSearchModalComponent } from './h-random-list-search-modal/h.random.list.search.modal.component';
import { HomeRandomListSearchComponent } from './h-random-list-search/h.random.list.search.component';
import { HomeRandomListTableComponent } from './h-random-list-table/h-random-list-table1/h.random.list.table.component';
import { HomeRandomListTable2Component } from './h-random-list-table/h-random-list-table2/h.random.list.table2.component';
import { HomeScrollLoadComponent } from './h-scroll-load/h-scroll-load1/h.scroll.load.component';
import { HomeScrollLoad2Component } from './h-scroll-load/h-scroll-load2/h.scroll.load2.component';
import { HomeScrollLoad3Component } from './h-scroll-load/h-scroll-load3/h.scroll.load3.component';
import { HomeSelectModalComponent } from './h-select-modal/h.select.modal.component';
import { Client1Component } from './h-selector/h-selector-child1/client-1.component';
import { Client2Component } from './h-selector/h-selector-child2/client-2.component';
import { HomeSelectorComponent } from './h-selector/home.selector.component';
import { HomeTable1Component } from './h-table/h-table1/h.table1.component';
import { HomeTable2Component } from './h-table/h-table2/h.table2.component';
import { HomeTable3Component } from './h-table/h-table3/h.table3.component';
import { HomeTooltipComponent } from './h-tooltip/h-tooltip1/home.tooltip.component';
import { HomeTooltip2Component } from './h-tooltip/h-tooltip2/home.tooltip2.component';
import { HomeComponent } from './home.component';
import { ChildComponent } from './pages/child/child.component';
import { GetNgxSelectComponent } from './pages/get-ngx-select/get-ngx-select.component';
import { HomeInvestmentListComponent } from './pages/investment-list/h.investment.list.component';
import { ParentComponent } from './pages/parent/parent.component';
import { TestAroundChildComponent } from './pages/test-around/test.around.child.component';
import { TestAroundComponent } from './pages/test-around/test.around.component';
import { TestInputOutputComponent } from './pages/test-input-output/test.input.output.component';
import { TestModalContentComponent } from './pages/test-modal/test-modal-content/test-modal-content.component';
import { TestModalComponent } from './pages/test-modal/test-modal.component';
import { HomeRandomListTable3Component } from './h-random-list-table/h-random-list-table3/h.random.list.table3.component';
import { HomeRandomListTable4Component } from './h-random-list-table/h-random-list-table4/h.random.list.table4.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/test-around', component: TestAroundComponent },
  { path: 'home/test-modal', component: TestModalComponent },
  { path: 'home/test-inputoutput', component: TestInputOutputComponent },
  { path: 'home/parent', component: ParentComponent },
  { path: 'home/get-ngx-select', component: GetNgxSelectComponent },
  { path: 'home/select-modal', component: HomeSelectModalComponent },
  { path: 'home/options', component: HomeOptionsComponent },
  { path: 'home/table1', component: HomeTable1Component },
  { path: 'home/table2', component: HomeTable2Component },
  { path: 'home/table3', component: HomeTable3Component },
  { path: 'home/scroll-load', component: HomeScrollLoadComponent },
  { path: 'home/scroll-load2', component: HomeScrollLoad2Component },
  { path: 'home/scroll-load3', component: HomeScrollLoad3Component },
  { path: 'home/progress-bar-scroll', component: HomeProgressBarScrollComponent },
  { path: 'home/grid', component: HomeGridComponent },
  { path: 'home/grid2', component: HomeGrid2Component },
  { path: 'home/grid3', component: HomeGrid3Component },
  { path: 'home/flex', component: HomeFlexComponent },
  { path: 'home/flex2', component: HomeFlex2Component },
  { path: 'home/selector', component: HomeSelectorComponent },
  { path: 'home/investlist', component: HomeInvestmentListComponent },
  { path: 'home/itemlist', component: HomeRandomListTableComponent },
  { path: 'home/itemlist2', component: HomeRandomListTable2Component },
  { path: 'home/itemlist3', component: HomeRandomListTable3Component },
  { path: 'home/itemlist4', component: HomeRandomListTable4Component },
  { path: 'home/tooltip2', component: HomeTooltip2Component },
];

@NgModule({
  declarations: [
    HomeComponent,
    TestAroundComponent,
    TestAroundChildComponent,
    TestModalComponent,
    ParentComponent,
    ChildComponent,
    GetNgxSelectComponent,
    HomeSelectModalComponent,
    TestModalContentComponent,
    TestInputOutputComponent,
    HomeTable1Component,
    HomeTable2Component,
    HomeTable3Component,
    HomeScrollLoadComponent,
    HomeScrollLoad2Component,
    HomeScrollLoad3Component,
    HomeOptionsComponent,
    HomeProgressBarScrollComponent,
    HomeGridComponent,
    HomeGrid2Component,
    HomeGrid3Component,
    HomeFlexComponent,
    HomeFlex2Component,
    HomeSelectorComponent,
    Client1Component,
    Client2Component,
    HomeInvestmentListComponent,
    HomeRandomListTableComponent,
    HomeRandomListTable2Component,
    HomeRandomListTable3Component,
    HomeRandomListTable4Component,
    HomeRandomListSearchComponent,
    HomeRandomListSearchModalComponent,
    HomeTooltipComponent,
    HomeTooltip2Component,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
