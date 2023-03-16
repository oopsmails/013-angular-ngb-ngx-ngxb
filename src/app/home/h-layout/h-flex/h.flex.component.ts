import { Component, OnInit } from '@angular/core';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-grid',
  templateUrl: './h.flex.component.html',
  styleUrls: ['./h.flex.component.scss'],
})
export class HomeFlexComponent implements OnInit {
  private COMPONENT_NAME = 'HomeFlexComponent';
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  constructor() {}

  ngOnInit(): void {}
}
