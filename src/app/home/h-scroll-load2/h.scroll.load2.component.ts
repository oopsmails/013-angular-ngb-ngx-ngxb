import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';

@Component({
  selector: 'app-test-around',
  templateUrl: './h.scroll.load2.component.html',
  styleUrls: ['./h.scroll.load2.component.scss'],
})
/**
 * Angular example that implements lazy loading/infinite scrolling
 * to load more items from a mock backend as the user scrolls down
 */
export class HomeScrollLoad2Component implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeScrollLoad2Component';

  private onDestroy$: Subject<boolean> = new Subject();

  currentPage = 1;
  loading = false;
  randomItems$: Observable<RandomItem[]>;
  randomItems: RandomItem[] = [];
  maxPosts = 100;
  eachLoadingNumber = 10;
  previousScrollTop: number = 0;

  @ViewChild('itemList') itemList: ElementRef;

  constructor(
    private sharedDataService: SharedDataService,
    private oopsPaginationService: OopsPaginationService<RandomItem>
  ) {}
  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit');
    this.randomItems$ = this.sharedDataService.getRandomItems(200, 500);

    this.loadItems(0, this.eachLoadingNumber);
  }

  onScroll(event: any) {
    // Get the scroll position of the div
    const scrollTop = event.target.scrollTop;

    // Get the previous scroll position from a previous event or default to 0
    const previousScrollTop = this.previousScrollTop || 0;

    // Determine the direction of the scroll
    const scrollDirection = scrollTop < previousScrollTop ? 'up' : 'down';

    // Save the current scroll position for the next event
    this.previousScrollTop = scrollTop;

    // Do something based on the scroll direction
    if (scrollDirection === 'up') {
      // console.log('Scrolling up!');
    }

    if (scrollDirection === 'down') {
      // console.log('Scrolling down ............ ');
      const start = this.randomItems.length;
      const end = start + this.eachLoadingNumber;
      this.loadItems(start, end);
    }
  }

  loadItems(start: number, end: number) {
    // here, if initial loaded 5, and max is 100 and load 10 every time, then could end up with 105
    // so initial load number should be the same as every time loading number.
    if (this.loading || this.randomItems.length >= this.maxPosts) {
      return;
    }

    this.loading = true;
    this.randomItems$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((items) => {
          console.log(this.COMPONENT_NAME + ', loadItems, tap, items.length = ', (items && items.length) || 'null-0');
        }),
        switchMap((items) => {
          console.log(
            this.COMPONENT_NAME + ', loadItems, mergeMap, items.length = ',
            (items && items.length) || 'null-0'
          );
          return this.oopsPaginationService.getRangedItems(items, start, end);
        })
      )
      .subscribe((items) => {
        console.log(this.COMPONENT_NAME + ', loadItems, items.length = ', (items && items.length) || 'null-0');
        this.randomItems.push(...items);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
