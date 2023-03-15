import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'h-progress-bar-scroll',
  templateUrl: './h.progress.bar.scroll.component.html',
  styleUrls: ['./h.progress.bar.scroll.component.scss'],
})
export class HomeProgressBarScrollComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeProgressBarScrollComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;
  previousScrollTop: number = 0;

  options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  selectedOption = '1';
  showingNumberOption = '1';
  numberWithOption = 0;

  // private element: HTMLElement; // Zzz
  public progressBarVisible = false;
  public progressBarWidth = 0;

  constructor(private carDataService: CarDataService, private elementRef: ElementRef) {}
  ngOnInit() {
    this.insts$ = of(INSTITUTIONS).pipe(
      map((items) => {
        // if triggering load from backend according to selected option, then set showingNumberOption
        this.showingNumberOption = '1'; // change to other option value if loading is based on option selection
        this.numberWithOption = items.length;
        return items;
      })
    );

    this.filteredInsts$ = of(INSTITUTIONS).pipe(
      map((items) => {
        return items.filter((item) => {
          return item.cuid.toLowerCase().includes('rbcd');
          // return item.englishName.toLowerCase().indexOf('ops') >= 0;
        });
      })
    );

    // this.element = this.elementRef.nativeElement.querySelector('.scrolling-div'); // Zzz
  }

  onSelectOptionChange(option) {
    console.log('select ----------- ', option);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    if (scrollTop > 0) {
      this.progressBarVisible = true;
      this.progressBarWidth = (scrollTop / (scrollHeight - clientHeight)) * 100;
    } else {
      this.progressBarVisible = false;
      this.progressBarWidth = 0;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
