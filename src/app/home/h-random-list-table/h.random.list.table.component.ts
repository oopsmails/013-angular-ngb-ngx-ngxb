import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService, Car } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { DirectionEnum } from 'src/app/localshared/models/shared-model';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';

interface RandomItemExt extends RandomItem {
  type?: string;
}

@Component({
  selector: 'app-random-list-table',
  templateUrl: './h.random.list.table.component.html',
  styleUrls: ['./h.random.list.table.component.scss'],
})
export class HomeRandomListTableComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeRandomListTableComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  items$: Observable<RandomItem[]>;
  items: RandomItem[] = [];
  filteredItems$: Observable<RandomItem[]>;

  editItems: RandomItemExt[] = [];

  directions: string[] = Object.values(DirectionEnum).map((value) => String(value));
  directionEnum = DirectionEnum;

  constructor(
    private sharedDataService: SharedDataService,
    private modalService: NgbModal,
    private oopsPaginationService: OopsPaginationService<RandomItem>
  ) {}

  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit');
    this.items$ = this.sharedDataService.getRandomItems(30, 500);
  }

  getDirectionEnumValues() {
    return Object.keys(this.directionEnum).filter((type) => isNaN(<any>type) && type !== 'values');
  }

  onRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onRowClick, item = ', item);
  }

  onEditableRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onEditableRowClick, item = ', item);
  }

  addNewRow() {
    this.editItems.push({
      id: null,
      name: '',
      desc: '',
      customKey: '',
      type: '',
    });
  }

  onCustomKeySelected(item, idx) {
    console.log(this.COMPONENT_NAME + ', onCustomKeySelected, item = ', item);
    // if (item instanceof Car) {
    //   this.editItems[idx].customKey = 'selected-' + item.id;
    // } else if (item instanceof RandomItem) {
    //   this.editItems[idx].customKey = 'selected-' + item.name;
    // } else {
    //   this.editItems[idx].customKey = 'not-selected';
    // }
    if (item && item.name) {
      this.editItems[idx].customKey = 'selected-' + item.name;
    } else if (item && item.model) {
      this.editItems[idx].customKey = 'selected-' + item.model;
    } else {
      this.editItems[idx].customKey = 'not-selected';
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
