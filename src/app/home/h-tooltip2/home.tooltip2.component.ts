import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tooltip2',
  templateUrl: './home.tooltip2.component.html',
  styleUrls: ['./home.tooltip2.component.scss'],
})
export class HomeTooltip2Component implements OnInit, OnDestroy {
  @Input() content: string;
  @Input() isVisible = false;

  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
