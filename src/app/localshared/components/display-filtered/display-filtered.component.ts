import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-display-filtered',
  templateUrl: './display-filtered.component.html',
  styleUrls: ['./display-filtered.component.scss'],
})
export class DisplayFilteredComponent<T> implements OnInit {
  private COMPONENT_NAME = 'DisplayFilteredComponent';

  @Input('allItems') allItems: T[];
  @Input('fieldToDisplay') fieldToDisplay: string;
  @Output() Emitter = new EventEmitter(true);
  // @Output('filteredItems') filteredItems: T[];

  private onDestroy$: Subject<boolean> = new Subject();
  showItems = true;
  searchText: string = '';

  ngOnInit() {
    console.log(this.COMPONENT_NAME + 'ngOnInit ..............');
  }

  onSelectItemClick(item: T) {
    console.log(this.COMPONENT_NAME + 'onSelectItemClick, item: ', item);
  }

  // ngOnChanges() {
  //   this.filterItems();
  // }

  // filterItems() {
  //   if (!this.allItems) {
  //     return;
  //   }
  //   this.filteredItems = this.allItems.filter((item) =>
  //     item[this.fieldToDisplay].toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
