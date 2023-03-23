import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { DirectionEnum } from 'src/app/localshared/models/shared-model';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';

interface RandomItemExt extends RandomItem {
  type?: string;
}

@Component({
  selector: 'app-ramdom-list-search-adv',
  templateUrl: './h.random.list.search.adv.component.html',
  styleUrls: ['./h.random.list.search.adv.component.scss'],
})
export class HomeRandomListSearchAdvComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeRandomListSearchAdvComponent';

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

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}