import { Component, ElementRef, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-hm-search-modal',
  templateUrl: './hm.search.modal.component.html',
  styleUrls: ['./hm.search.modal.component.scss'],
})
export class HomeMadeSearchModalComponent implements OnInit, OnDestroy {
  @Output() selectOptionEmitter = new EventEmitter(true);

  private COMPONENT_NAME = 'HomeMadeSearchModalComponent';
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private onDestroy$: Subject<boolean> = new Subject();

  displaying$: Observable<Car[]>;
  searchText: string;
  selectedItem;
  searchValue: string;
  showItems = false;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(private carDataService: CarDataService, private modalService: NgbModal) {}

  ngOnInit() {
    this.displaying$ = this.displayingLookup$.pipe(
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

            result = result.filter((item: Car) => {
              return item.description.toLowerCase().includes(this.searchText);
            });

            this.showItems = true;
            console.log(`switchMap ........... result.length = `, (result && result.length) || 0);
            return result;
          })
        );
      }),
      catchError((err) => {
        console.error(err);
        let result: Car[] = [];
        return of(result);
      })
      // takeUntil(this.onDestroy$)
    );
    this.displayingLookup$.next('');
  }

  onKeyupSearch(event) {
    console.log('event in onKeyupSearch -------> ', event);
    this.displayingLookup$.next(event);
  }

  inputOnClick() {
    this.showItems = !this.showItems;
    this.searchValue = '';
    if (this.showItems == true) {
      setTimeout(() => {
        this.displayingLookup$.next('');
      });
    }
  }

  onSelectSymbolClick(content, option) {
    this.selectedItem = option;
    this.showItems = false;
    if (option && option === '-1') {
      this.openModal(content, this.selectedItem);
    } else {
      this.searchValue = option.description;
      this.selectOptionEmitter.emit(this.selectedItem);
    }
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log(this.COMPONENT_NAME + ', openModal, item =', item);
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}