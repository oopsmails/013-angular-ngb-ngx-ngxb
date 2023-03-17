import { Component, OnInit } from '@angular/core';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-grid',
  templateUrl: './h.grid.component.html',
  styleUrls: ['./h.grid.component.scss'],
})
export class HomeGridComponent implements OnInit {
  private COMPONENT_NAME = 'HomeGridComponent';
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  constructor() {}

  ngOnInit(): void {}
}
