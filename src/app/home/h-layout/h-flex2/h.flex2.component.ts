import { Component, OnInit } from '@angular/core';
import { HOME_HOME_LINK, HOME_BACK_TO_HOME } from 'src/app/localshared/models/home.constants';

@Component({
  selector: 'app-grid2',
  templateUrl: './h.flex2.component.html',
  styleUrls: ['./h.flex2.component.scss'],
})
export class HomeFlex2Component implements OnInit {
  routerLinkInput = HOME_HOME_LINK;
  linkText = HOME_BACK_TO_HOME;

  constructor() {}

  ngOnInit(): void {}
}
