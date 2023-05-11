import { Component, ViewChild } from '@angular/core';
import { NgxSelectComponent } from 'ngx-select-ex';

@Component({
  selector: 'app-parent',
  // template: `
  //   <app-child [message]="message" (messageEvent)="receivedMessage($event)"></app-child>
  // `,
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  private compmentName: string = 'ParentComponent';
  message = 'Hello from Parent Component!';
  inputObject: any = { prop1: 'value1', prop2: new Date().toLocaleTimeString() };

  manualSearch: string;

  @ViewChild('selectComp', { static: false }) selectComp: NgxSelectComponent;

  receivedMessage(event) {
    console.log(this.compmentName, 'receivedMessage, event =', event);
    setTimeout(() => {
      console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
    }, 0);
  }

  changeInputObject() {
    this.inputObject = { prop1: 'new value1', prop2: new Date().toLocaleTimeString() };
  }
}
