import { Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap,
  tap,
} from 'rxjs';
import { UsState } from 'src/app/shared/models/shared.model';
import { StateService } from './../../../shared/services/state.service';

@Component({
  selector: 'ngb-typeahead-search',
  templateUrl: './ngb.typeahead.search.scrollable.component.html',
  styleUrls: ['./ngb.typeahead.search.scrollable.component.scss'],
})
export class NgbTypeaheadSearchScrollableComponent {
  model: UsState;
  searching = false;
  searchFailed = false;

  constructor(private stateService: StateService) {}

  searchState: OperatorFunction<string, readonly UsState[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.stateService.getStates().pipe(
          map((items: UsState[]) => {
            return (
              items.filter((item: UsState) => {
                return item.stateName.toLowerCase().indexOf(term.toLowerCase()) >= 0;
              }) || []
            );
          }),
          tap((items: UsState[]) => {
            console.log('searchState result.size: ', (items && items.length) || '0');
            this.searchFailed = false;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  searchState1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.stateService.searchStates(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatter = (result: UsState) => result.stateName;
  inputFormatter = (result: UsState) => result.stateName;
}
