import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppNavBarComponent } from './components/app-nav-bar/app-nav-bar.component';

@NgModule({
  declarations: [AppNavBarComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild([])],
  exports: [AppNavBarComponent],
})
export class CoreModule {}
