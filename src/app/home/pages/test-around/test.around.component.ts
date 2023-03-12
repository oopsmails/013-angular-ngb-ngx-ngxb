import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'app-test-around',
  templateUrl: './test.around.component.html',
  styleUrls: ['./test.around.component.scss'],
})
export class TestAroundComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'TestAroundComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;
  previousScrollTop: number = 0;

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {
    this.insts$ = of(INSTITUTIONS);

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

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
