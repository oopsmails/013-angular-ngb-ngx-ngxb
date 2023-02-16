import { FormControl } from '@angular/forms';
import { INgxSelectOption } from 'ngx-select-ex';
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
  private COMPONENT_NAME = 'TestModalComponent';

  public fcItemSearch = new FormControl();

  placeHolderStr = 'Type to search ...';
  randomItems$: Observable<RandomItem[]>;
  searchText: string = '';
  selectedItem;

  constructor(private sharedDataService: SharedDataService, private modalService: NgbModal) {}

  ngOnInit() {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log(this.COMPONENT_NAME + ', openModal, item =', item);
    this.selectedItem = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onClick(event) {
    console.log(this.COMPONENT_NAME + ', openModal, event =', event);
  }

  onKeyup(event) {
    this.searchText = event.target.value;
    console.log(this.COMPONENT_NAME + ', openModal, event.target.value =', event.target.value);
  }

  onSearchCallback(search: string, item: INgxSelectOption): boolean {
    if (item.value === '-1') {
      return true;
    }

    return true;
  }
}
