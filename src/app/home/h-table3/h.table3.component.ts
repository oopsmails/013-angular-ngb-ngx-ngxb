import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'app-home-table3',
  templateUrl: './h.table3.component.html',
  styleUrls: ['./h.table3.component.scss'],
})
export class HomeTable3Component implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeTable2Component';

  private onDestroy$: Subject<boolean> = new Subject();

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;

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

  onRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onRowClick, item = ', item);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
