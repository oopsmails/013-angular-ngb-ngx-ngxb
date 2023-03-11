import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'test-around-child',
  template: ` <div class="list-container"></div> `,
  styles: [
    `
      .list-container {
        height: 200px;
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
