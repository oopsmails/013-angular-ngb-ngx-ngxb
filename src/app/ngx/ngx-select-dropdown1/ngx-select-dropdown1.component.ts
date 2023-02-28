import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ngx-select-dropdown1',
  templateUrl: './ngx-select-dropdown1.component.html',
  styleUrls: ['./ngx-select-dropdown1.component.scss'],
})
export class NgxSelectDropdown1Component implements OnInit {
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  displaying$: Observable<RandomItem[]>;

  selectedOption = null;
  config = {
    displayFn: (item: any) => {
      return item.name;
    }, //a replacement ofr displayKey to support flexible text displaying for each item
    displayKey: 'description', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.displaying$ = of(this.sharedDataService.makeMockRandomItems(30));
  }
}
