import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable } from 'rxjs';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss'],
})
export class TestModalComponent implements OnInit {
  // items = [
  //   { id: 1, name: 'Item 1', description: 'This is item 1' },
  //   { id: 2, name: 'Item 2', description: 'This is item 2' },
  //   { id: 3, name: 'Item 3', description: 'This is item 3' },
  // ];

  // @Output() selectItem = new EventEmitter();

  randomItems$: Observable<RandomItem[]>;

  selectedItem;

  constructor(private sharedDataService: SharedDataService, private modalService: NgbModal) {}

  ngOnInit() {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log('item=', item);
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
