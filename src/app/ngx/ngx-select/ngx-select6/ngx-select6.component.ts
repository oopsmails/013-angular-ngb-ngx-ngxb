import { Component, OnDestroy, OnInit } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-ngx-select6',
  templateUrl: './ngx-select6.component.html',
  styleUrls: ['./ngx-select6.component.scss'],
})
export class NgxSelect6Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public items$: Observable<RandomItem[]>;

  isDropdownOpen = false;
  searchText: string = '';
  selectedItemId: number;
  selectedItem: RandomItem;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemHover(option) {
    // console.log('onItemHover ... ', option.data);
    if (!option.data && option.data.id && option.data.id === this.selectedItemId) {
      return;
    }
    this.selectedItem = option.data;
    this.selectedItemId = this.selectedItem.id;
  }

  onItemSelected(option) {
    console.log('onItemSelected ... ', option.data);
    this.selectedItem = option.data;
    this.selectedItemId = this.selectedItem.id;
    this.isDropdownOpen = false;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
