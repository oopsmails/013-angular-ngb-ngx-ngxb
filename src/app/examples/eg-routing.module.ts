import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesSelectComponent } from './eg-select/eg.select.component';
import { ExamplesPatternComponent } from './eg-pattern/eg.pattern.component';

const routes: Routes = [
  { path: 'eg/select', component: ExamplesSelectComponent },
  { path: 'eg/pattern', component: ExamplesPatternComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
