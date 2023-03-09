import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-test-around',
  templateUrl: './test.around.component.html',
  styleUrls: ['./test.around.component.scss'],
})
export class TestAroundComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  allItems$: Observable<Car[]>;

  allItems: Car[];

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {
    this.allItems$ = this.carDataService.getCarItems(20, 200).pipe(
      takeUntil(this.onDestroy$),
      map((items: Car[]) => {
        items.forEach((item) => {
          item.description = item.brand + ' - ' + item.model + ' : ' + item.year;
        });
        console.log(`ngOnInit ........... items.length = `, (items && items.length) || 0);
        return items;
      })
    );

    this.allItems$.pipe(takeUntil(this.onDestroy$)).subscribe((items) => (this.allItems = items));
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
