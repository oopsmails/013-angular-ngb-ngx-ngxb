import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  OperatorFunction,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Car } from 'src/app/shared/models';
import { CarDataService } from 'src/app/shared/services/car.data.service';

@Component({
  selector: 'app-ngb-typeahead-filter',
  templateUrl: './ngb.typeahead.filter.component.html',
  styleUrls: ['./ngb.typeahead.filter.component.scss'],
})
export class NgbTypeaheadFilterComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  carItems$: Observable<Car[]>;

  errorMessage?: string;
  model: Car;
  searching = false;
  searchFailed = false;

  compareFn = (a: Car, b: Car) => {
    let result = a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0;
    result = result == 0 ? (a.model > b.model ? 1 : b.model > a.model ? -1 : 0) : result;
    return result == 0 ? (a.year > b.year ? 1 : b.year > a.year ? -1 : 0) : result;
  };

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {}

  searchCar: OperatorFunction<string, readonly Car[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.carDataService.getCarItems(50).pipe(
          takeUntil(this.onDestroy$),
          map((items: Car[]) => {
            items.forEach((item) => {
              item.description = item.brand + ' - ' + item.model + ' : ' + item.year;
            });

            const filteredItems =
              items.filter((item: Car) => {
                return item.description.toLowerCase().indexOf(term) > -1;
              }) || [];

            // return items.sort((a, b) => (a.brand > b.brand ? 1 : b.brand > a.brand ? -1 : 0));
            return this.carDataService.getSortedCarItems(filteredItems, this.compareFn) || [];
          }),
          tap((items: Car[]) => {
            console.log('result.size: ', (items && items.length) || '0');
            this.searchFailed = false;
          }),
          catchError((err) => {
            this.searchFailed = true;
            this.errorMessage = (err && err.message) || 'Something goes wrong';
            console.log('err: ', this.errorMessage);
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatter = (result: Car) => result.brand;
  inputFormatter = (result: Car) => result.brand;

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
