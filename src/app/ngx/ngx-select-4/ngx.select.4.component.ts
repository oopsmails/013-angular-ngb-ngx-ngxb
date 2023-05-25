import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngx-select2',
  templateUrl: './ngx.select.4.component.html',
  styleUrls: ['./ngx.select.4.component.scss'],
})
export class NgxSelect4Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  searchText = '';

  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
  ];

  selectedItem: any;

  ngOnInit() {}

  // filter(term: string) {
  //   const filteredItems = this.items.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
  //   for (let i = 0; i < filteredItems.length; i++) {}
  //   return filteredItems;
  // }

  onKeyUp($event) {
    console.log(`onKeyUp ........... $event.target.value = `, $event.target.value);
  }

  inputKeyUp(inputValue, $event) {
    console.log(`inputKeyUp ........... inputValue = `, inputValue);
    console.log(`inputKeyUp ........... $event.target.value = `, $event.target.value);
    this.searchText = inputValue;
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
