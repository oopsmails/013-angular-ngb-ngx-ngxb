import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RandomItem } from 'src/app/shared/models/sample.model';
import { SharedDataService } from 'src/app/shared/services/shared.data.service';

@Component({
  selector: 'ngx-test',
  templateUrl: './ngx.select.1.component.html',
  styleUrls: ['./ngx.select.1.component.scss'],
})
export class NgxSelect1Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public formControl1 = new FormControl(2);
  public formControl2 = new FormControl(1);

  public items: RandomItem[];
  public items$: Observable<RandomItem[]>;
  public items2$: Observable<RandomItem[]>;

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems();
    this.items$.subscribe((resp) => {
      this.items = resp;
      this.items.forEach((item) => {
        item.customKey = item.id + ' - ' + item.name;
      });
    });

    this.items2$ = this.sharedDataService.getRandomItems(100, 1000);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
