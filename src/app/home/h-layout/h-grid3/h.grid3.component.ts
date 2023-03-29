import { Component, OnInit } from '@angular/core';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-grid3',
  templateUrl: './h.grid3.component.html',
  styleUrls: ['./h.grid3.component.scss'],
})
export class HomeGrid3Component implements OnInit {
  private COMPONENT_NAME = 'HomeGrid3Component';
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  constructor() {}

  ngOnInit(): void {}
}
