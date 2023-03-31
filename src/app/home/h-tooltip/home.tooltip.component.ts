import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-test-around',
  templateUrl: './home.tooltip.component.html',
  styleUrls: ['./home.tooltip.component.scss'],
})
export class HomeTooltipComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
