import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { map, Observable, Subject } from 'rxjs';

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

    this.items2$ = this.sharedDataService.getRandomItems(100, 1000).pipe(
      map((items) => {
        items.forEach((item) => {
          if (item.id === 8 || item.id === 10) {
            item.desc = 'abc';
          }
          item.customKey = '' + item.id + '-' + item.name + '-' + item.desc;
        });
        return items;
      })
    );
  }

  onSearchCallback(search: string, item: INgxSelectOption): boolean {
    console.log(`onSearchCallback ........... searcht = `, search);
    console.log(`onSearchCallback ........... item = `, item);

    const randomItem = <RandomItem>item.data;
    console.log(`onSearchCallback ........... randomItem = `, randomItem);

    return (
      randomItem.name.toLowerCase().includes(search.toLowerCase()) ||
      randomItem.desc.toLowerCase().includes(search.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
