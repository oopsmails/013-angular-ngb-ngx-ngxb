import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectComponent } from 'ngx-select-ex';
import { RandomItem, SharedDataService, RsSearchResult } from 'oops-lib002';
import {
  Subject,
  Observable,
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
  takeUntil,
  tap,
  delay,
} from 'rxjs';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit, OnDestroy {
  private compmentName: string = 'SelectModalComponent';
  private onDestroy$: Subject<boolean> = new Subject();

  public formControl4 = new FormControl(3);

  @ViewChild('selectComp', { static: false }) selectComp: NgxSelectComponent;

  displaying$: Observable<RandomItem[]>;
  searchText: string;

  selectedItem = -1;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.displaying$ = this.displayingLookup$.pipe(
      startWith(''),
      map((searching) => searching && searching.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      map((searching) => (this.searchText = searching)),
      switchMap(() => {
        console.log(`switchMap ........... this.searchText = `, this.searchText);
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

    const items: RandomItem[] = this.sharedDataService
      .makeMockRandomItems(30)
      .filter((item) => item.name.includes(searchText));
    console.log('adding moreItem ......');
    const moreItem: RandomItem = { id: -1, name: 'More items for ... ' + this.searchText };
    items.push(moreItem);
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

  openModal(content, item) {
    // console.log('content=', content);
    console.log('item=', item);
    this.selectedItem = item;

    if (item && item === -1) {
      setTimeout(() => {
        console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
        this.selectComp.focusToInput();
        console.log(this.compmentName, 'receivedMessage, this.selectComp 2 =', this.selectComp);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      }, 0);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
