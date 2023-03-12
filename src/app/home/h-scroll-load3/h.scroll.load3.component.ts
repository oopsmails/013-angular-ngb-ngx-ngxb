import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';

@Component({
  selector: 'app-test-around',
  templateUrl: './h.scroll.load3.component.html',
  styleUrls: ['./h.scroll.load3.component.scss'],
})
/**
 * Angular example that implements lazy loading/infinite scrolling
 * to load more items from a mock backend as the user scrolls down
 */
export class HomeScrollLoad3Component implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
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

    this.loadItems(0, 5);

    // const element = this.itemList.nativeElement;
    // const scrollTop = element.scrollTop;
    // const scrollHeight = element.scrollHeight;
    // const offsetHeight = element.offsetHeight;

    // if (scrollTop + offsetHeight >= scrollHeight) {
    //   // this is preventing loading on scrolling up!
    //   const start = this.randomItems.length;
    //   const end = start + 10;
    //   this.loadItems(start, end);
    // }
  }

  ngAfterViewInit(): void {
    this.checkAndLoad();
  }

  ngAfterViewChecked(): void {}

  checkAndLoad() {
    console.log(this.COMPONENT_NAME + ', checkAndLoad, checking heights = ');
    console.log(
      this.COMPONENT_NAME + ', checkAndLoad, this.randomItems = ',
      (this.randomItems && this.randomItems.length) || 'null-0'
    );
    // Check if content is already larger than container height
    const container = document.querySelector('.item-list') as HTMLElement;
    if (container.scrollHeight >= container.offsetHeight) {
      // const element = this.itemList.nativeElement; // ALSO WORKING, BUT, only after ngAfterViewInit()
      // if (element.scrollHeight >= element.offsetHeight) {
      setTimeout(() => this.onScroll());
    }
  }

  onScroll() {
    if (this.randomItems.length >= this.maxPosts) {
      console.log(
        this.COMPONENT_NAME + ', onScroll, this.randomItems.length >= this.maxPosts',
        this.randomItems.length,
        this.maxPosts
      );
      return;
    }
    const element = this.itemList.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const offsetHeight = element.offsetHeight;

    if (scrollTop + offsetHeight >= scrollHeight) {
      // this is preventing loading on scrolling up!
      const start = this.randomItems.length;
      const end = start + 10;
      this.loadItems(start, end);
    }
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
