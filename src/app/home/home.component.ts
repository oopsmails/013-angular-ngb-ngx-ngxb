import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService, UsState } from 'oops-lib002';
import {
  concatMap,
  delay,
  exhaustMap,
  flatMap,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Institution } from '../models/inst';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  scrollProgress: number = 0;

  states$: Observable<UsState[]>;

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;

  constructor(private stateService: StateService, private router: Router) {
    // https://www.youtube.com/watch?v=2zJRw3Cl_Vs&list=RDCMUCssWuTdNCWN4RSF3wHzzjMw&index=12
    const example = (operator: any) => () => {
      from([0, 1, 2, 3, 4])
        .pipe(
          takeUntil(this.onDestroy$),
          operator((x: any) => of(x).pipe(delay(500))),
          tap({
            next: console.log,
            error: console.error,
            complete: () => console.log(`${operator.name} completed`),
          })
        )
        .subscribe();
    };

    // example(map)();
    // example(flatMap)();
    setTimeout(() => example(mergeMap)()); // get all into final result, order dosen't matter!
    setTimeout(() => example(switchMap)()); // search, cancel previous request
    setTimeout(() => example(exhaustMap)()); // from 0, it already gets the observable, so, after are all ignored!
    setTimeout(() => example(concatMap)()); // getUser first, then getUserDetails in order, need to use concatMap
  }

  ngOnInit() {
    this.states$ = this.stateService.getUsStateCity();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // console.log(this.COMPONENT_NAME + ', onScroll .................');
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;
  }

  navToPage(page) {
    console.log('HomeComponent, navToPage, page = ' + page);
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
