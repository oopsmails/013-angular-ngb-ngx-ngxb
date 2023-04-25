import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesSelectComponent } from './eg-select/eg.select.component';

const routes: Routes = [{ path: 'eg/select', component: ExamplesSelectComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
