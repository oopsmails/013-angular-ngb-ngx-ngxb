import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService, StateService, UsState } from 'oops-lib002';
import { filter, map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from '../localshared/data/insts.data';
import { Institution } from '../models/inst';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  states$: Observable<UsState[]>;

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.states$ = this.stateService.getUsStateCity();
    this.insts$ = of(INSTITUTIONS).pipe(
      map((items) => {
        return items.filter((item) => {
          // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
          return item.cuid.toLowerCase().includes('rbcd');
          // return item.englishName.toLowerCase().indexOf('ops') >= 0;
        });
      })
    );
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
