import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlTestComponent } from './html-test/html-test.component';
import { HtmlCardsComponent } from './html-cards/html-cards.component';

const routes: Routes = [
  { path: 'html/test', component: HtmlTestComponent },
  { path: 'html/cards', component: HtmlCardsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HtmlRoutingModule {}
