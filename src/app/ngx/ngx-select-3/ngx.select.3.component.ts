import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { RandomItem } from 'src/app/shared/models/sample.model';
import { SharedDataService } from 'src/app/shared/services/shared.data.service';

@Component({
  selector: 'ngx-select3',
  templateUrl: './ngx.select.3.component.html',
  styleUrls: ['./ngx.select.3.component.scss'],
})
export class NgxSelect3Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public formControl4 = new FormControl(3);

  displaying$: Observable<RandomItem[]>;
  searchText: string;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.displaying$ = this.displayingLookup$.pipe(
      startWith(''),
      map((searching) => searching && searching.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      map((searching) => (this.searchText = searching)),
      switchMap(() => {
        console.log(`switchMap ........... this.searchText = `, this.searchText);
        return this.sharedDataService
          .searchRandomItems(this.searchText)
          .pipe(map((data) => data.resultList));
      }),
      catchError((err) => {
        console.error(err);
        return of(this.sharedDataService.makeMockRandomItems(0));
      }),
      takeUntil(this.onDestroy$)
    );
  }

  onKeyUpSearch($event) {
    this.searchText = $event.target.value;
    // this.sharingService.symbolSearchSharing$.next(this.searchText);
    console.log(`onKeyUpSearch ........... this.searchText = `, this.searchText);
    this.displayingLookup$.next(this.searchText);
  }

  onClick($event) {
    this.displayingLookup$.next('');
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
