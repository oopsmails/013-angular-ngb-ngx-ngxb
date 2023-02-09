import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomItem, RsSearchResult, SharedDataService } from 'oops-lib002';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

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

  moreItem: RandomItem = { id: -1, name: 'More items for ... ' };

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
        // return this.sharedDataService
        //   .searchRandomItems(this.searchText)
        //   .pipe(map((data) => data.resultList));

        return this.searchRandomItemsBySearchText(this.searchText).pipe(
          map((data) => data.resultList)
        );
      }),
      catchError((err) => {
        console.error(err);
        return of(this.sharedDataService.makeMockRandomItems(0));
      }),
      takeUntil(this.onDestroy$)
    );
  }

  searchRandomItemsBySearchText(searchText: string): Observable<RsSearchResult<RandomItem>> {
    if (!searchText || searchText === '' || searchText.length < 1) {
      return of(this.sharedDataService.defaultRandomItemSearchRs);
    }

    // if 30000, then browser freezing when rendering search result items because too many
    const items: RandomItem[] = this.sharedDataService
      .makeMockRandomItems(30)
      .filter((item) => item.name.includes(searchText));
    console.log('adding moreItem ......');
    this.moreItem.name = this.moreItem.name + this.searchText;
    items.push(this.moreItem);
    const result: RsSearchResult<RandomItem> = { resultList: items };
    return of(result).pipe(
      tap((resp) => console.log('searchText: ', searchText, 'returning: ', resp.resultList.length)),
      delay(500)
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
