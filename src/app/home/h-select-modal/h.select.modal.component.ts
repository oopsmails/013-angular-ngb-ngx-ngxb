import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxSelectOption, NgxSelectComponent } from 'ngx-select-ex';
import { RandomItem, RsSearchResult, SharedDataService } from 'oops-lib002';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-select-modal',
  templateUrl: './h.select.modal.component.html',
  styleUrls: ['./h.select.modal.component.scss'],
})
export class HomeSelectModalComponent implements OnInit, OnDestroy {
  private compmentName: string = 'SelectModalComponent';
  private onDestroy$: Subject<boolean> = new Subject();

  public fcItemSearch = new FormControl(3);
  placeHolderStr = 'Type to search ...';

  // public mockItemSearchMore: RandomItem = { id: -1, name: 'Search to view all ...' };
  public mockItemSearchMore: RandomItem = { id: -1, name: this.placeHolderStr };

  @ViewChild('selectComp', { static: false }) selectComp: NgxSelectComponent;

  displaying$: Observable<RandomItem[]>;
  searchText: string;
  passingSearchText: string;

  // selectedItem = -1;
  selectedItem;

  private displayingLookup$: Subject<string> = new Subject();

  constructor(private router: Router, private sharedDataService: SharedDataService, private modalService: NgbModal) {}

  ngOnInit() {
    this.displaying$ = this.displayingLookup$.pipe(
      // startWith(''),
      tap((searching) => console.log(`tapping 1 ........... search = `, searching)),
      map((searching) => searching && searching.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      map((searching) => (this.searchText = searching)),
      // tap((searching) => console.log(`tapping 2 ........... search = `, this.searchText)),
      switchMap(() => {
        console.log(`switchMap ........... this.searchText = `, this.searchText);
        return this.searchRandomItemsBySearchText(this.searchText).pipe(
          map((data) => {
            let result = data.resultList;
            if (result && result.length > 6) {
              result = result.slice(0, 5);
              this.mockItemSearchMore.name = 'View more result ...';
              result.push(this.mockItemSearchMore);
            }

            if (this.searchText && this.searchText.length > 0 && result.length === 0) {
              console.log(`No item found with searchText = `, this.searchText);
              this.mockItemSearchMore.name = 'Search to view all ...';
              result.push(this.mockItemSearchMore);
            }

            return result;
          })
        );
      }),
      catchError((err) => {
        console.error(err);
        let result = this.sharedDataService.makeMockRandomItems(0);
        result.push(this.mockItemSearchMore);
        return of(result);
      }),
      takeUntil(this.onDestroy$)
    );
    this.displayingLookup$.next('');
  }

  searchRandomItemsBySearchText(searchText: string): Observable<RsSearchResult<RandomItem>> {
    if (!searchText || searchText === '' || searchText.length < 1) {
      // return of(this.sharedDataService.defaultRandomItemSearchRs);
      // let resultList = this.sharedDataService.makeMockRandomItems(0);
      let resultList: RandomItem[] = [];
      const result: RsSearchResult<RandomItem> = { resultList: resultList };
      return of(result);
    }

    const items: RandomItem[] = this.sharedDataService
      .makeMockRandomItems(30)
      .filter((item) => item.name.includes(searchText));
    // console.log('adding moreItem ......');
    // const moreItem: RandomItem = { id: -1, name: 'More items for ... ' + this.searchText };
    // items.push(moreItem);
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

  onSearchCallback(search: string, item: INgxSelectOption): boolean {
    if (item.value === '-1') {
      return true;
    }

    return true;
  }

  onClick($event) {
    console.log(`onClick ........... this.searchText = `, this.searchText);
    this.displayingLookup$.next('');
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log(`openModal ........... item = `, item);
    this.selectedItem = item;

    if (item && item === -1) {
      setTimeout(() => {
        // console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
        // this.selectComp.focusToInput();
        // console.log(this.compmentName, 'receivedMessage, this.selectComp 2 =', this.selectComp);
        this.passingSearchText = this.searchText;
        this.displayingLookup$.next('');
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      }, 0);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
