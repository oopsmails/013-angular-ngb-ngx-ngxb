import { ColorEnum } from '../../localshared/models/shared-model';
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
  selector: 'app-random-list-table2',
  templateUrl: './h.random.list.table2.component.html',
  styleUrls: ['./h.random.list.table2.component.scss'],
})
export class HomeRandomListTable2Component implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeRandomListTable2Component';

  private onDestroy$: Subject<boolean> = new Subject();

  items$: Observable<RandomItem[]>;
  items: RandomItem[] = [];
  filteredItems$: Observable<RandomItem[]>;

  editItems: RandomItemExt[] = [];

  directions: string[] = Object.values(DirectionEnum).map((value) => String(value));
  directionEnum = DirectionEnum;
  colorSelected: string;
  colors = Object.values(ColorEnum);

  constructor(
    private sharedDataService: SharedDataService,
    private modalService: NgbModal,
    private oopsPaginationService: OopsPaginationService<RandomItem>
  ) {}

  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit');
    console.log(this.COMPONENT_NAME + ', to get value of a specific ENUM, ColorEnum.RED = ', ColorEnum.RED);

    const colorValue: string = 'Red';
    // const colorEnum: ColorEnum = this.getEnumKeyFromValue(ColorEnum, colorValue);
    const colorEnum: ColorEnum = ColorEnum[colorValue];
    console.log(this.COMPONENT_NAME + ', to get ENUM from a string, Red, colorEnum = ', colorEnum);

    // this.colorSelected = null; // or undefined
    this.colorSelected = '';
    this.items$ = this.sharedDataService.getRandomItems(30, 500);
    this.addNewRow();
  }

  getDirectionEnumValues() {
    return Object.keys(this.directionEnum).filter((type) => isNaN(<any>type) && type !== 'values');
  }

  getEnumKeyFromValue(enumObj: any, value: string): string | undefined {
    const keys = Object.keys(enumObj).filter((k) => enumObj[k] === value);
    return keys.length > 0 ? keys[0] : undefined;
  }

  onRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onRowClick, item = ', item);
  }

  onEditableRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onEditableRowClick, item = ', item);
  }

  onSelectColor(event) {
    console.log(this.COMPONENT_NAME + ', onSelectColor, event = ', event);
    this.colorSelected = event;
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
      // this should be the same as receiveSelectItem() in HomeRandomListSearchComponent!!! in face, need only one!!!
      this.editItems[idx].customKey = 'selected-' + item.name;
    } else if (item && item.model) {
      this.editItems[idx].customKey = 'selected-' + item.model;
    } else {
      this.editItems[idx].customKey = 'not-selected';
    }
  }

  isNameFieldDisabled(idx) {
    return idx === 1;
  }

  onRemove(idx) {
    // console.log('onRemove, idx = ', idx);
    if (idx === 0) {
      if (this.editItems.length === 1) {
        this.editItems = [];
      } else {
        this.editItems = this.editItems.slice(1, idx);
      }
    } else if (idx === this.editItems.length - 1) {
      if (this.editItems.length === 1) {
        this.editItems = [];
      } else {
        this.editItems = this.editItems.slice(0, idx);
      }
    } else {
      const firstPart = this.editItems.slice(0, idx);
      const secondPart = this.editItems.slice(idx + 1);
      this.editItems = firstPart.concat(secondPart);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
