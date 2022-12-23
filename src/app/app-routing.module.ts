import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomemadeComponent } from './homemade/homemade/homemade.component';
import { NgbHomeComponent } from './ngb/ngb-home/ngb-home.component';
import { NgxHomeComponent } from './ngx/ngx-home/ngx-home.component';
import { NgxbHomeComponent } from './ngxb/ngxb-home/ngxb-home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hm', component: HomemadeComponent },
  { path: 'ngb', component: NgbHomeComponent },
  { path: 'ngx', component: NgxHomeComponent },
  { path: 'ngxb', component: NgxbHomeComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
