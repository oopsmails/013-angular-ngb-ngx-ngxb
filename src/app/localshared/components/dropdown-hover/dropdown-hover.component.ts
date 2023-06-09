import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dropdown-hover',
  templateUrl: './dropdown-hover.component.html',
  styleUrls: ['./dropdown-hover.component.scss'],
})
export class DropDownHoverComponent {
  @Input() itemList: any[];
  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemHovering = new EventEmitter<any>();

  selectedItem: any;
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemHover(item: any) {
    this.selectedItem = item;
    this.itemHovering.emit(item);
  }

  onItemSelected(item: any) {
    this.selectedItem = item;
    this.itemSelected.emit(item);
    this.isDropdownOpen = false;
  }
}
