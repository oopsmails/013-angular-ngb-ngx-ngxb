import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppNavBarComponent } from './components/app-nav-bar/app-nav-bar.component';

@NgModule({
  declarations: [AppNavBarComponent],
  imports: [CommonModule, NgbNavModule, NgbDropdownModule, SharedModule, RouterModule.forChild([])],
  exports: [AppNavBarComponent],
})
export class CoreModule {}
