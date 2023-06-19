import { Component, OnInit } from '@angular/core';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from '../../hm.constants';

@Component({
  selector: 'app-hm-dropdown-search2',
  templateUrl: './hm-dropdown-search2.component.html',
  styleUrls: ['./hm-dropdown-search2.component.scss'],
})
export class HmDropdownSearch2Component implements OnInit {
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  inputText: string = '';
  displayingItems: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.displayingItems = ['address 1: ', 'address 2: fax 2222', 'address 3: '];
  }
}
