import { Component, OnDestroy, OnInit } from '@angular/core';

import { RandomItem, SharedDataService } from 'oops-lib002';

import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-ngx-select7',
  templateUrl: './ngx-select7.component.html',
  styleUrls: ['./ngx-select7.component.scss'],
})
export class NgxSelect7Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  private displayingLookup$: Subject<string> = new Subject();

  private SEPARATER: string = ' $$$ ';

  public items$: Observable<RandomItem[]>;
  public displaying$: Observable<RandomItem[]>;

  // not really in use
  initItems: RandomItem[] = [];
  displayItems: RandomItem[] = [];

  isDropdownOpen = false;
  searchText: string = '';
  selectedItemId: number;
  selectedItem: RandomItem;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems().pipe(
      map((items) => {
        items.forEach((item) => {
          item.customKey = item.name + this.SEPARATER + item?.desc + this.SEPARATER + item.id;
        });
        return items;
      })
    );

    this.displaying$ = this.displayingLookup$.pipe(
      tap((searching) => {
        console.log(`tapping 1 ........... search = `, searching);
        this.searchText = searching && searching.trim();
      }),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(() => {
        if (!this.searchText || this.searchText === '' || this.searchText.length < 1) {
          return this.items$;
        }

        console.log(`tapping 2 ........... search = `);
        return this.items$.pipe(
          map((items) => {
            return items.filter((item) => this.searchFn(this.searchText, item));
          })
        );
      }),
      catchError((err) => {
        console.error(err);
        let result: RandomItem[] = [];
        return of(result);
      })
    );

    // ------------------------ not really in use ---------------------
    this.sharedDataService
      .getRandomItems()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((items) => {
          console.log('ngOnInit, loadItems, tap, items.length = ', (items && items.length) || 'null-0');
        })
      )
      .subscribe((items) => {
        console.log('ngOnInit, items.length = ', items.length);
        this.initItems = items;
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelectedOption(option) {
    // console.log('onSelectedOption ... ', option);

    this.selectedItem = option.eventData;
  }

  searchFn(search: string, item: RandomItem) {
    // !!! because imageUrl and text are NOT added in customKey, which is used as optionTextField="customKey" in html,
    // they are NOT considered as search criteria!!!

    if (item && search) {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.desc.toLowerCase().includes(search.toLowerCase()) ||
        item?.imageUrl.toLowerCase().includes(search.toLowerCase()) ||
        item?.text.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
