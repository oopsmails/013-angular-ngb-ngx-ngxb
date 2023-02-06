import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarModel, RandomItem, SharedDataService } from 'oops-lib002';
import { delay, Observable, Subject, takeUntil, tap, timer } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-hm-spinner',
  templateUrl: './hm-spinner.component.html',
  styleUrls: ['./hm-spinner.component.scss'],
})
// Ref: https://danielk.tech/home/angular-how-to-add-a-loading-spinner
export class HmSpinnerComponent implements OnInit, OnDestroy {
  TIMER_REFRESH = 2000;
  private onDestroy$: Subject<boolean> = new Subject();
  private timer$ = timer(this.TIMER_REFRESH, this.TIMER_REFRESH).pipe(takeUntil(this.onDestroy$));

  randomItems$: Observable<RandomItem[]>;
  navBarModels$: Observable<NavBarModel[]>;

  constructor(
    public loaderService: LoaderService,
    private sharedDataService: SharedDataService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
    // delay here will NOT help for testing spinner, need to use HttpDelayInterceptor
    this.navBarModels$ = this.httpClient.get('assets/config/nav-bar-config.json').pipe(
      tap(() => console.log('returning ... '))
      // tap(() => this.loader.setLoading(true)),
      // delay(2000),
      // tap(() => this.loader.setLoading(false))
    ) as Observable<NavBarModel[]>;

    this.triggerSpinnerOn();
  }

  triggerSpinnerOn() {
    console.log('First function called');
    this.loaderService.setLoading(true);
    setTimeout(() => {
      // this.loaderService.setLoading(true);
      this.triggerSpinnerOff();
    }, 1000);
  }

  triggerSpinnerOff() {
    console.log('Second function called');
    this.loaderService.setLoading(false);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
