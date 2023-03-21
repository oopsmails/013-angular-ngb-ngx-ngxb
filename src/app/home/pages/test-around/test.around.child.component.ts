import { Component, Input, OnInit, ContentChild } from '@angular/core';

@Component({
  selector: 'test-around-child',
  template: `
    <div class="list-container">
      <div class="title">Child Component</div>
      <h3>content without any selector</h3>
      <ng-content></ng-content>
      <hr />
      <h3>content from selector: using id</h3>
      <ng-content select="[titleText]"></ng-content>
      <hr />
      <h3>content from selector: using css class</h3>
      <ng-content select=".desc"></ng-content>
    </div>
  `,
  styles: [
    `
      .list-container {
        height: 300px;
        overflow: auto;
      }
    `,
  ],
})
export class TestAroundChildComponent implements OnInit {
  items: string[] = [];
  loading = false;
  count = 10;
  offset = 0;

  ngOnInit() {}
}
