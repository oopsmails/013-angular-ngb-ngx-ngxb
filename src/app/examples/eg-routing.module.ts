import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesSelectComponent } from './eg-select/eg.select.component';
import { ExamplesPatternComponent } from './eg-pattern/eg.pattern.component';
import { ExampleInputValidateComponent } from './eg-input-validate/eg.input.validate.component';

const routes: Routes = [
  { path: 'eg/select', component: ExamplesSelectComponent },
  { path: 'eg/pattern', component: ExamplesPatternComponent },
  { path: 'eg/inputvalidate', component: ExampleInputValidateComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
