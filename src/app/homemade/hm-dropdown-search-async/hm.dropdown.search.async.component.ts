import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from '../hm.constants';

@Component({
  selector: 'app-hm-dropdown-search-async',
  templateUrl: './hm.dropdown.search.async.component.html',
  styleUrls: ['./hm.dropdown.search.async.component.scss'],
})
export class HomeMadeDropdownSearchAsyncComponent implements OnInit, OnDestroy {
  @ViewChild('searchText') searchTextElement: ElementRef;

  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private onDestroy$: Subject<boolean> = new Subject();

  carItems$: Observable<Car[]>;

  errorMessage?: string;
  // model: Car;
  searching = false;
  searchFailed = false;
  showDropdown = false;

  selectedValue: Car;
  searchValue: string;
  filteredList$: Observable<Car[]>;
  allItems$: Observable<Car[]>;

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {
    this.allItems$ = this.carDataService.getCarItems(1000, 2000).pipe(
      takeUntil(this.onDestroy$),
      map((items: Car[]) => {
        items.forEach((item) => {
          item.description = item.brand + ' - ' + item.model + ' : ' + item.year;
        });
        return items;
      })
    );
    this.filteredList$ = this.allItems$;
  }

  dropdownOnClick() {
    console.log('dropdownOnClick ');
    this.filteredList$ = this.allItems$;
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown == true) {
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.searchTextElement.nativeElement.focus();
      }, 0);
    }
  }

  filterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
    // window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.filteredList$ = this.allItems$.pipe(
        map((resp) => resp.slice()),
        tap((resp) =>
          console.log('this.filteredList indropdown -------> ', (resp && resp.length) || 'Something goes wrong')
        )
      );
    } else {
      this.filteredList$ = this.allItems$.pipe(
        map((resp: Car[]) => {
          return resp.filter((item) => item.description.toLowerCase().indexOf(searchString) > -1);
        }),
        tap((resp) => console.log('filterDropdown, this.filteredList.length: ', (resp && resp.length) || '0???'))
      );
    }
    // window.scrollTo(window.scrollX, window.scrollY - 1);
  }

  selectValue(description) {
    this.selectedValue = description;
    this.showDropdown = false;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
