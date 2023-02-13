import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-modal-content',
  templateUrl: './test-modal-content.component.html',
  styleUrls: ['./test-modal-content.component.scss'],
})
export class TestModalContentComponent implements OnInit {
  private COMPONENT_NAME = 'TestModalContentComponent';

  @Input('passingItem') item;

  constructor() {}

  ngOnInit(): void {
    console.log(this.COMPONENT_NAME + ', this.item = ', this.item);
  }
}
