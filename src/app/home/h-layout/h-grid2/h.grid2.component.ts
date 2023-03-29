import { Component, OnInit } from '@angular/core';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-grid',
  templateUrl: './h.grid2.component.html',
  styleUrls: ['./h.grid2.component.scss'],
})
export class HomeGrid2Component implements OnInit {
  private COMPONENT_NAME = 'HomeGrid2Component';
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  constructor() {}

  ngOnInit(): void {}
}
