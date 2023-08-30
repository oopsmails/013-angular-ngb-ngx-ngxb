import { Component, OnInit } from '@angular/core';
import { PageNavBean } from 'src/app/localshared/models/shared-model';

@Component({
  selector: 'app-html-home',
  templateUrl: './html-home.component.html',
  styleUrls: ['./html-home.component.scss'],
})
export class HtmlHomeComponent implements OnInit {
  pageNavBeans: PageNavBean[] = [];

  constructor() {}

  ngOnInit(): void {
    let pageNavBean = new PageNavBean();
    pageNavBean.url = '/html/test';
    pageNavBean.title = 'Html and CSS Testing';
    pageNavBean.desc = 'Pure Tesing Page';
    this.pageNavBeans.push(pageNavBean);

    pageNavBean = new PageNavBean();
    pageNavBean.url = '/html/cards';
    pageNavBean.title = 'Movable Stacked Card Row in CSS';
    pageNavBean.desc = 'Movable Stacked Card Row in CSS';
    this.pageNavBeans.push(pageNavBean);

    this.seeIfRevisit('from ngOnInit ...');
  }

  seeIfRevisit(from: string): string {
    const result = new Date().toLocaleTimeString();
    console.log('3. from ...', from, ' ... timestamp: ', result);

    return result;
  }
}
