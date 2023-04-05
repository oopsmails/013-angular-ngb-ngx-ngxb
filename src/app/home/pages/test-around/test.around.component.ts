import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { TestObject } from 'src/app/localshared/models/shared-model';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'app-test-around',
  templateUrl: './test.around.component.html',
  styleUrls: ['./test.around.component.scss'],
})
export class TestAroundComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'TestAroundComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  myArray: TestObject[] = [
    { enName: 'John', frName: 'Jean', rank: 'A' },
    { enName: 'Peter', frName: 'Pierre', rank: 'C' },
    { enName: 'Sarah', frName: 'Sara', rank: 'B' },
    { enName: 'David', frName: 'David', rank: 'A' },
    { enName: 'Alice', frName: 'Alice' },
    { enName: 'Robert', frName: 'Robert', rank: 'B' },
    { enName: 'Julie', frName: 'Julie' },
  ];

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

  // private element: HTMLElement;
  public progressBarVisible = false;
  public progressBarWidth = 0;

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

    // this.element = this.elementRef.nativeElement.querySelector('.scrolling-div');

    this.sortArray();
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

  compareFn(a: TestObject, b: TestObject): number {
    if (a.rank && b.rank) {
      if (a.rank < b.rank) {
        return -1;
      } else if (a.rank > b.rank) {
        return 1;
      } else {
        if (a.enName < b.enName) {
          return -1;
        } else if (a.enName > b.enName) {
          return 1;
        } else {
          if (a.frName < b.frName) {
            return -1;
          } else if (a.frName > b.frName) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    } else if (a.rank && !b.rank) {
      return -1;
    } else if (!a.rank && b.rank) {
      return 1;
    } else {
      return 0;
    }
  }

  sortArray() {
    this.myArray.sort(this.compareFn);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
