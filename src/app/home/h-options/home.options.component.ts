import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'app-test-around',
  templateUrl: './home.options.component.html',
  styleUrls: ['./home.options.component.scss'],
})
export class HomeOptionsComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeOptionsComponent';

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

  constructor(private carDataService: CarDataService) {}
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
      console.log('Scrolling up!');
    }

    if (scrollDirection === 'down') {
      console.log('Scrolling down!');
    }
  }

  onSelectOptionChange(option) {
    console.log('select ----------- ', option);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
