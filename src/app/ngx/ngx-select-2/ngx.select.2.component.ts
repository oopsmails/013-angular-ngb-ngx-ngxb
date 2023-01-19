import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RandomItem } from 'src/app/shared/models/sample.model';
import { SharedDataService } from 'src/app/shared/services/shared.data.service';

@Component({
  selector: 'ngx-test',
  templateUrl: './ngx.select.2.component.html',
  styleUrls: ['./ngx.select.2.component.scss'],
})
export class NgxSelect2Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public formControl3 = new FormControl(3);

  public items: RandomItem[];
  public items$: Observable<RandomItem[]>;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.itemReplay$.pipe(takeUntil(this.onDestroy$));
    this.items$.subscribe((resp) => (this.items = resp));
  }

  // [searchFn]="customSearchFn" not working
  customSearchFn = (searchText: string, item: any) => {
    console.log('customSearchFn: searchText = ', searchText);
    this.sharedDataService.itemReplay$.pipe(takeUntil(this.onDestroy$));
  };

  //
  onMouseOver($event) {
    console.log(`onMouseOver ........... $event.target.value = `, $event.target.value);
  }

  onKeyUp($event) {
    console.log(`onKeyUp ........... $event.target.value = `, $event.target.value);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
