import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlTestComponent } from './html-test/html-test.component';

const routes: Routes = [{ path: 'html/test', component: HtmlTestComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HtmlRoutingModule {}
