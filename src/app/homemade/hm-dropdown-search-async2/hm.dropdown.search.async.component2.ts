import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from '../hm.constants';

@Component({
  selector: 'app-hm-dropdown-search-async2',
  templateUrl: './hm.dropdown.search.async.component2.html',
  styleUrls: ['./hm.dropdown.search.async.component2.scss'],
})
export class HomeMadeDropdownSearchAsyncComponent2 implements OnInit, OnDestroy {
  @ViewChild('searchText') searchTextElement: ElementRef;

  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private onDestroy$: Subject<boolean> = new Subject();

  displaying$: Observable<Car[]>;
  searchText: string;
  selectedItem;
  showDropdown = false;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(private carDataService: CarDataService) {}

  ngOnInit() {
    this.displaying$ = this.displayingLookup$.pipe(
      // startWith(''),
      tap((searching) => {
        console.log(`tapping 1 ........... search = `, searching);
        this.searchText = searching && searching.trim();
      }),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((searching) => {
        // console.log(`switchMap ........... searching = `, searching);
        // this.searchText = searching && searching.trim();
        // console.log(`switchMap ........... this.searchText = `, this.searchText);

        if (!this.searchText || this.searchText === '' || this.searchText.length < 1) {
          return of([]);
        }

        return this.carDataService.getCarItems(20, 500).pipe(
          map((data) => {
            console.log(`switchMap ........... data.length = `, (data && data.length) || 0);
            let result: Car[] = [];
            if (data && data.length > 6) {
              result = data.slice(0, 5);
            } else {
              result = data || [];
            }

            if (this.searchText && this.searchText.length > 0 && result.length === 0) {
              console.log(`No item found with searchText = `, this.searchText);
            }

            result.forEach((item: Car) => {
              item.description = item.brand + ' - ' + item.model + ' : ' + item.year; // update each item here if necessary
            });

            return result.filter((item: Car) => {
              return item.description.toLowerCase().includes(this.searchText);
            });
          })
        );
      }),
      catchError((err) => {
        console.error(err);
        let result: Car[] = [];
        return of(result);
      }),
      takeUntil(this.onDestroy$)
    );
    this.displayingLookup$.next('');
  }

  filterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
    this.displayingLookup$.next(e);
  }

  dropdownOnClick() {
    console.log('dropdownOnClick ');
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown == true) {
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.searchTextElement.nativeElement.focus();
      }, 0);
    }
  }

  selectValue(data) {
    console.log('selectValue: ', data);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
