import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesSelectComponent } from './eg-select/eg.select.component';
import { ExamplesPatternComponent } from './eg-pattern/eg.pattern.component';
import { ExampleInputValidateComponent } from './eg-input-validate/eg.input.validate.component';
import { ExamplesSelectSublist1Component } from './eg-select-sublist/eg-select-sublist1/eg.select.sublist1.component';
import { ExamplesSelectSublist2Component } from './eg-select-sublist/eg-select-sublist2/eg.select.sublist2.component';
import { ExamplesSelectSublist3Component } from './eg-select-sublist/eg-select-sublist3/eg.select.sublist3.component';
import { ExamplesSelectSublist4Component } from './eg-select-sublist/eg-select-sublist4/eg.select.sublist4.component';
import { ExamplesSelectSublist5Component } from './eg-select-sublist/eg-select-sublist5/eg.select.sublist5.component';
import { ExamplesSelectSublist6Component } from './eg-select-sublist/eg-select-sublist6/eg.select.sublist6.component';

const routes: Routes = [
  { path: 'eg/select', component: ExamplesSelectComponent },
  { path: 'eg/selectsublist1', component: ExamplesSelectSublist1Component },
  { path: 'eg/selectsublist2', component: ExamplesSelectSublist2Component },
  { path: 'eg/selectsublist3', component: ExamplesSelectSublist3Component },
  { path: 'eg/selectsublist4', component: ExamplesSelectSublist4Component },
  { path: 'eg/selectsublist5', component: ExamplesSelectSublist5Component },
  { path: 'eg/selectsublist6', component: ExamplesSelectSublist6Component },
  { path: 'eg/pattern', component: ExamplesPatternComponent },
  { path: 'eg/inputvalidate', component: ExampleInputValidateComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
