import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  // template: ` {{ message }} `,
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() message: string;
  @Output() messageEvent = new EventEmitter<string>();

  randomItems$: Observable<RandomItem[]>;

  selectedItem;

  constructor(private sharedDataService: SharedDataService, private modalService: NgbModal) {
    // setTimeout(() => {
    this.messageEvent.emit(this.message);
    // }, 1000);

    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log('item=', item);
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
