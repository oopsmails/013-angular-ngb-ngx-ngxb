import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'oops-lib002';
import { ExamplesHomeComponent } from './examples/eg-home/eg.home.component';
import { HomeComponent } from './home/home.component';
import { HomemadeComponent } from './homemade/homemade/homemade.component';
import { HtmlHomeComponent } from './html/html-home/html-home.component';
import { NotAllowedComponent } from './localshared/components/not-allowed/not-allowed.component';
import { NgbHomeComponent } from './ngb/ngb-home/ngb-home.component';
import { NgxHomeComponent } from './ngx/ngx-home/ngx-home.component';
import { NgxbHomeComponent } from './ngxb/ngxb-home/ngxb-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hm', component: HomemadeComponent },
  // { path: 'hm', component: HomemadeComponent, canActivate: [NavigationGuard] },
  { path: 'html', component: HtmlHomeComponent },
  { path: 'ngb', component: NgbHomeComponent },
  { path: 'ngx', component: NgxHomeComponent },
  { path: 'ngxb', component: NgxbHomeComponent },
  { path: 'eg', component: ExamplesHomeComponent },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
