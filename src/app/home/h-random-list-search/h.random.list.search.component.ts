import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car, CarDataService, RandomItem } from 'oops-lib002';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
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
  @Input('inputItem') inputItem: any;
  @Output() selectOptionEmitter = new EventEmitter(true);
  @ViewChild('searchTextInput', { static: false }) searchTextInput: ElementRef;

  private COMPONENT_NAME = 'HomeRandomListSearchComponent';
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private onDestroy$: Subject<boolean> = new Subject();

  placeHolder = 'Type to search ...';
  displaying$: Observable<Car[]>;
  searchText: string;
  selectedItem;
  inEditMode = false;

  lengthToUseLargerDiv = 5;

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

    // NOT needed, just for testing, can be done in Parent using ng-container with *ngIf
    if (this.inputItem.disableCustomKey) {
      this.searchText = this.inputItem.customKey; // not working for chaning placeHolder
      this.placeHolder = this.inputItem.customKey; // not working
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // NOT needed, just for testing, can be done in Parent using ng-container with *ngIf
    console.log('Input object changed: ', changes.inputItem.currentValue);
  }

  onKeyupSearch(event) {
    console.log('event in onKeyupSearch -------> ', event);
    this.displayingLookup$.next(event);
    this.inEditMode = true;
  }

  descFilterFn = (item: Car, searchText: string) => (boolean) => {
    return item.description.toLowerCase().includes(searchText);
  };

  inputOnFocus() {
    console.log('inputOnFocus ....');
    if (this.inputItem && this.inputItem.customKey === '') {
      this.inEditMode = true;
    } else {
      // make sure existing customKey showing
      this.searchText = this.inputItem.customKey;
    }
    setTimeout(() => {
      if (this.inEditMode) {
        this.displayingLookup$.next('');
      }
    });
  }

  // inputOnBlur(event) {
  //   console.log('inputOnBlur ...., event = ', event.target.value);
  //   this.inEditMode = false;
  //   // this.searchText = this.inputItem.customKey;
  //   this.selectOptionEmitter.emit(this.searchText);
  // }

  inputOnBlur(event: FocusEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    // Check if the blur event is not caused by a TAB keydown event
    if (!event.relatedTarget) {
      console.log('inputOnBlur ...., inputValue = ', inputValue);
      // this.inEditMode = false;
      // this.searchText = this.inputItem.customKey;
      this.selectOptionEmitter.emit(this.searchText);
    }

    // setTimeout(() => {
    // if (this.modalService.hasOpenModals()) {
    //   this.modalService.dismissAll();
    // }
    this.inEditMode = false;
    // }, 0);
  }

  // inputOnTabKeydown(event) {
  //   console.log('inputOnTabKeydown ...., event = ', event.target.value);
  //   this.selectOptionEmitter.emit({
  //     eventSource: '[inputOnTabKeydown]',
  //     eventData: event.target.value,
  //   });
  // }

  onKeyDown(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('inputOnTabKeydown ...., inputValue = ', inputValue);
    if (event.key === 'Tab') {
      this.selectOptionEmitter.emit({
        eventSource: '[inputOnTabKeydown]',
        eventData: inputValue,
      });

      // setTimeout(() => {
      // if (this.modalService.hasOpenModals()) {
      //   this.modalService.dismissAll();
      // }
      this.inEditMode = false;
      // }, 0);

      // Prevent the onblur function from being called
      event.stopPropagation();
    }
  }

  onSelectSymbolClick(event: MouseEvent, content, option) {
    // from this quick search, NOT modal
    console.log('onSelectSymbolClick .... option: ', option);
    console.log(this.COMPONENT_NAME + 'onSelectSymbolClick, inputItem = ', this.inputItem);
    // console.log('onSelectSymbolClick .... event: ', event);
    this.selectedItem = option;
    this.inEditMode = false;
    if (option && option === '-1') {
      this.openModal(content, this.selectedItem);
    } else {
      // this.searchText = option.description;
      this.inputItem.customKey = 'selected-' + option.model;
      this.searchText = this.inputItem.customKey; // this is used to show update customKey
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
    // from modal
    console.log(this.COMPONENT_NAME + ', receiveSelectItem, item =', item);
    // this.onSelectSymbolClick(null, null, item); // cannot call this because need to distinguish from quick search or modal!!!

    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }

    // this should be the same as onCustomKeySelected() in HomeRandomListTableComponent!!! in face, nned only one!
    this.inputItem.customKey = 'selected-' + item.name;
    this.searchText = this.inputItem.customKey; // this is used to show update customKey
    this.selectedItem = item;
    this.inEditMode = false;
    this.selectOptionEmitter.emit(this.selectedItem);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
