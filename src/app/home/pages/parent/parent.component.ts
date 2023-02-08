import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  // template: `
  //   <app-child [message]="message" (messageEvent)="receivedMessage($event)"></app-child>
  // `,
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  message = 'Hello from Parent Component!';

  receivedMessage(event) {
    console.log(event);
  }
}
