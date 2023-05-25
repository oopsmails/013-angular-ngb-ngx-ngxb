import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tooltip2',
  templateUrl: './home.tooltip2.component.html',
  styleUrls: ['./home.tooltip2.component.scss'],
})
export class HomeTooltip2Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  isVisible = false;

  iconTop3 = '100%';
  iconLeft3 = '300%';
  iconBgColor3 = 'lightgreen';

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
