import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CarDataService, RandomItem, SharedDataService } from 'oops-lib002';
import { map, Observable, Subject, takeUntil, switchMap, mergeMap, tap } from 'rxjs';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-test-around',
  templateUrl: './h.scroll.load2.component.html',
  styleUrls: ['./h.scroll.load2.component.scss'],
})
/**
 * Angular example that implements lazy loading/infinite scrolling
 * to load more items from a mock backend as the user scrolls down
 */
export class HomeScrollLoad2Component implements OnInit, AfterViewInit, OnDestroy {
  private COMPONENT_NAME = 'HomeScrollLoad2Component';

  private onDestroy$: Subject<boolean> = new Subject();

  currentPage = 1;
  loading = false;
  randomItems$: Observable<RandomItem[]>;
  randomItems: RandomItem[] = [];
  maxPosts = 100;

  @ViewChild('itemList') itemList: ElementRef;

  constructor(
    private sharedDataService: SharedDataService,
    private oopsPaginationService: OopsPaginationService<RandomItem>
  ) {}
  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit');
    this.randomItems$ = this.sharedDataService.getRandomItems(200, 500);

    this.loadItems(0, 10);
  }

  ngAfterViewInit(): void {
    console.log(this.COMPONENT_NAME + ', ngAfterViewInit, checking heights = ');

    // Check if content is already larger than container height
    const container = document.querySelector('.item-list') as HTMLElement;
    // const element = this.itemList.nativeElement; // ALSO WORKING
    if (container.scrollHeight > container.offsetHeight) {
      // if (element.scrollHeight >= element.offsetHeight) {
      this.onScroll();
    }
  }

  onScroll() {
    const element = this.itemList.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const offsetHeight = element.offsetHeight;

    // if (scrollTop + offsetHeight >= scrollHeight) { // comment out for controlling by maxPosts
    const start = this.randomItems.length;
    const end = start + 10;
    this.loadItems(start, end);
    // }
  }

  loadItems(start: number, end: number) {
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
