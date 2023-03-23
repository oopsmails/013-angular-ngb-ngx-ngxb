import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car, CarDataService, RandomItem } from 'oops-lib002';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from 'src/app/homemade/hm.constants';
import { SearchCarService } from 'src/app/localshared/services/search.car.service';

interface RandomItemExt extends RandomItem {
  type?: string;
}

@Component({
  selector: 'app-ramdom-list-search',
  templateUrl: './h.random.list.search.component.html',
  styleUrls: ['./h.random.list.search.component.scss'],
})
export class HomeRandomListSearchComponent implements OnInit, OnDestroy {
  @Output() selectOptionEmitter = new EventEmitter(true);

  private COMPONENT_NAME = 'HomeRandomListSearchComponent';
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private onDestroy$: Subject<boolean> = new Subject();

  placeHolder = 'Type to search ...';
  displaying$: Observable<Car[]>;
  searchText: string;
  selectedItem;
  showItems = false;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(
    private carDataService: CarDataService,
    private searchCarService: SearchCarService,
    private modalService: NgbModal
  ) {}

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

        console.log(`tapping 2 ........... search = `);
        return this.carDataService.getCarItems(20, 500).pipe(
          map((data) => {
            console.log(`switchMap ........... data.length = `, (data && data.length) || 0);

            return this.searchCarService.processItems(
              data,
              this.searchText,
              100,
              this.searchCarService.filterFunctions.descriptionContains(this.searchText)
            );
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
    this.showItems = true;
  }

  descFilterFn = (item: Car, searchText: string) => (boolean) => {
    return item.description.toLowerCase().includes(searchText);
  };

  inputOnFocus() {
    console.log('inputOnFocus ....');
    this.showItems = true;
    setTimeout(() => {
      this.displayingLookup$.next('');
    });
  }

  inputOnBlur() {
    console.log('inputOnBlur ....');
    this.showItems = false;
  }

  onSelectSymbolClick(event: MouseEvent, content, option) {
    console.log('onSelectSymbolClick .... option: ', option);
    // console.log('onSelectSymbolClick .... event: ', event);
    this.selectedItem = option;
    this.showItems = false;
    if (option && option === '-1') {
      this.openModal(content, this.selectedItem);
    } else {
      this.searchText = option.description;
      this.selectOptionEmitter.emit(this.selectedItem);
    }
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log(this.COMPONENT_NAME + ', openModal, item =', item);
    this.selectedItem = item;
    this.modalService.open(content, {
      windowClass: 'top-level__ngb-modal',
      size: 'lg',
      centered: true,
      backdrop: 'static',
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  receiveSelectItem(item) {
    console.log(this.COMPONENT_NAME + ', receiveSelectItem, item =', item);
    this.onSelectSymbolClick(null, null, item);
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    // setTimeout(() => {
    //   this.searchText = item.name;
    //   this.selectOptionEmitter.emit(item);
    // });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
