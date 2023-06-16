import { Component, OnInit } from '@angular/core';
import { PageNavBean } from 'src/app/localshared/models/shared-model';

@Component({
  selector: 'app-htmlcss',
  templateUrl: './htmlcss.component.html',
  styleUrls: ['./htmlcss.component.scss'],
})
export class HtmlcssComponent implements OnInit {
  pageNavBeans: PageNavBean[] = [];

  constructor() {}

  ngOnInit(): void {
    let pageNavBean = new PageNavBean();
    pageNavBean.url = '';
    pageNavBean.title = 'Home';
    pageNavBean.desc = 'Back to Home';
    this.pageNavBeans.push(pageNavBean);
  }
}
