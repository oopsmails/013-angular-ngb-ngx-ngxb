import { Injectable } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchCarService {
  delayMs = 500;
  defaultLimits = 5;

  displayingLookup$: Subject<string> = new Subject();
  searchText: string = '';

  filterFunctions = {
    yearAfter2021: (car: Car) => car.year > '2021',
    yearStratWith: (prefix: string) => (car: Car) => car.year.toLowerCase().startsWith(prefix.toLowerCase()),
    yearEquals: (year: string) => (car: Car) => car.year.toLowerCase() === year.toLowerCase(),
    descriptionContains: (text: string) => (car: Car) => car.description.toLowerCase().includes(text.toLowerCase()),
    idBefore: (id: number) => (car: Car) => car.id < id,
  };

  constructor(private carDataService: CarDataService) {}

  // NOTE: this Subject only used for src\app\homemade\hm-search-modal\hm-search-modal-content\hm.search.modal.content.component.ts!!!
  // otherwise, could submit twice, unless change to ReplaySubject??? but, might not be good practice.

  // getDisplayingLookup(searchTextIn: string) {
  getDisplayingLookup(): Observable<Car[]> {
    // this.displayingLookup$.next(searchTextIn);

    console.log(`SearchCarService ...........`);

    return this.displayingLookup$.pipe(
      tap((searching) => {
        console.log(`tapping 1 ........... search = `, searching);
        this.searchText = searching && searching.trim();
      }),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(() => {
        if (!this.searchText || this.searchText === '' || this.searchText.length < 1) {
          return of([]);
        }

        return this.carDataService.getCarItems(30, this.delayMs).pipe(
          map((data) => {
            // console.log(`SearchCarService, switchMap ........... data.length = `, (data && data.length) || 0);
            // let result: Car[] = [];
            // if (data && data.length > 6) {
            //   result = data.slice(0, 5);
            // } else {
            //   result = data || [];
            // }

            // if (this.searchText && this.searchText.length > 0 && result.length === 0) {
            //   console.log(`No item found with searchText = `, this.searchText);
            // }

            // result.forEach((item: Car) => {
            //   item.description = item.brand + ' - ' + item.model + ' : ' + item.year; // update each item here if necessary
            // });

            // result = result.filter((item: Car) => {
            //   return item.description.toLowerCase().includes(this.searchText);
            // });

            // console.log(`switchMap ........... result.length = `, (result && result.length) || 0);

            let result: Car[] = this.processItems(data, this.searchText, null, null);
            return result;
          })
        );
      }),
      catchError((err) => {
        console.error(err);
        let result: Car[] = [];
        return of(result);
      })
    );
  }

  // filterArray<T>(arr: T[], filterFn: (item: T) => boolean): T[] {
  //   return arr.filter(filterFn);
  // }

  filterArray<T>(arr: T[], filterFn: (item: T) => boolean): T[] {
    return arr.filter(filterFn);
  }

  descFilterFn = (item: Car, searchText: string) => (boolean) => {
    return item.description.toLowerCase().includes(searchText);
  };

  processItems(items: Car[], searchText: string, limits: number, filterFn: (item: Car) => boolean): Car[] {
    // processItems(items: Car[], searchText: string, limits: number, filterFnName: string): Car[] {
    console.log(`SearchCarService, filterItems ........... data.length = `, (items && items.length) || 0);

    if (!limits) {
      limits = this.defaultLimits;
    }

    let result: Car[] = [];
    if (items && items.length > limits) {
      result = items.slice(0, limits - 1);
    } else {
      result = items || [];
    }

    if (searchText && searchText.length > 0 && result.length === 0) {
      console.log(`No item found with searchText = `, this.searchText);
    }

    result.forEach((item: Car) => {
      item.description = item.brand + ' - ' + item.model + ' : ' + item.year; // update each item here if necessary
    });

    if (filterFn) {
      // result = result.filter((item: Car) => {
      //   return item.description.toLowerCase().includes(this.searchText);
      // });
      result = this.filterArray(result, filterFn);
    } else {
      result = this.filterArray(result, this.filterFunctions.descriptionContains(searchText));
    }

    console.log(`filterItems ........... result.length = `, (result && result.length) || 0);
    return result;
  }
}
