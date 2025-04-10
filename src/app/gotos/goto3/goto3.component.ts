import { Component, OnDestroy, OnInit } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Subject, Observable, takeUntil, map } from 'rxjs';
import { RandomItemExt } from 'src/app/localshared/models/shared-model';

@Component({
  selector: 'app-goto-css-2',
  templateUrl: './goto3.component.html',
  styleUrls: ['./goto3.component.scss'],
})
export class GoTo3Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  items$: Observable<RandomItem[]>;
  items: RandomItemExt[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.items$ = this.sharedDataService.getRandomItems(5, 500);

    this.items$.pipe(takeUntil(this.onDestroy$)).subscribe((items: RandomItem[]) => {
      // this.items = items;
      items.forEach((item: RandomItem) => {
        const extItem: RandomItemExt = { ...item, displayKey: 'abc' };
        this.items.push(extItem);
      });
    });

    setTimeout(() => {
      console.log('1. empty ??? .... ', this.items.length);
      this.items.forEach((item: RandomItemExt) => {
        console.log('adding .... '); /// never here ...
        item.displayKey = 'abcd';
      });
    });

    console.log('2. empty ...., but before 1. empty', this.items.length);

    this.seeIfEmpty(this.items, 'ngOnInit, setTimeout');
  }

  seeIfEmpty(items: RandomItemExt[], from: string): number {
    console.log('3. from .... ', from, ' length: ', this.items.length);

    return this.items.length;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
