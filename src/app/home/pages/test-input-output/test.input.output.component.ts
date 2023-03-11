import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-test-around',
  templateUrl: './test.input.output.component.html',
  styleUrls: ['./test.input.output.component.scss'],
})
export class TestInputOutputComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'TestAroundComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  allItems$: Observable<Car[]>;
  allItems: Car[];

  selectedItem: Car;

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {
    this.allItems$ = this.carDataService.getCarItems(20, 200).pipe(
      takeUntil(this.onDestroy$),
      map((items: Car[]) => {
        items.forEach((item) => {
          item.description = item.brand + ' - ' + item.model + ' : ' + item.year;
        });
        console.log(this.COMPONENT_NAME + `ngOnInit ........... items.length = `, (items && items.length) || 0);
        return items;
      })
    );

    this.allItems$.pipe(takeUntil(this.onDestroy$)).subscribe((items) => (this.allItems = items));
  }

  handleSelectItem($event) {
    // console.log(this.COMPONENT_NAME + `handleSelectItem ........... $event = `, $event || 'null');
    this.selectedItem = $event;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
