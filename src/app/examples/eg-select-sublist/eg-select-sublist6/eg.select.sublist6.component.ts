import { Component, OnDestroy, OnInit } from '@angular/core';

interface Branch {
  branchName: string;
  branchFaxNumber: string;
  branchAddress: string[];
  showSublist: boolean;
}

@Component({
  selector: 'app-eg-select-sublist6',
  templateUrl: './eg.select.sublist6.component.html',
  styleUrls: ['./eg.select.sublist6.component.scss'],
})
export class ExamplesSelectSublist6Component implements OnInit {
  itemList: any[] = [];

  isDropdownOpen = false;
  selectedItem: any;

  constructor() {}

  ngOnInit() {
    for (let i = 1; i < 5; i++) {
      this.itemList.push({
        id: i,
        name: 'Branch ' + i,
        address: {
          streetNumber: '888' + i,
          streetName: 'Mock ' + i + ' Street',
          city: 'City' + i,
          province: 'Province' + i,
          country: 'Country' + i,
          postalCode: 'PostalCode' + i,
        },
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemHover(item: any) {
    this.selectedItem = item;
  }

  onItemSelected(item: any) {
    this.selectedItem = item;
    this.isDropdownOpen = false;
  }
}
