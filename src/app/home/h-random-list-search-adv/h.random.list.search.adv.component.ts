import { Component, OnDestroy, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { DirectionEnum } from 'src/app/localshared/models/shared-model';

@Component({
  selector: 'app-ramdom-list-search-adv',
  templateUrl: './h.random.list.search.adv.component.html',
  styleUrls: ['./h.random.list.search.adv.component.scss'],
})
export class HomeRandomListSearchAdvComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeRandomListSearchAdvComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  @Input('passingSearchText') searchText = '';
  @Output() selectedItem = new EventEmitter(true);

  items$: Observable<RandomItem[]>;
  directionEnum = DirectionEnum;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit');
    this.items$ = this.sharedDataService.getRandomItems(30, 500);
  }

  getDirectionEnumValues() {
    return Object.keys(this.directionEnum).filter((type) => isNaN(<any>type) && type !== 'values');
  }

  onRowClick(item) {
    console.log(this.COMPONENT_NAME + ', onRowClick, item = ', item);
    this.selectedItem.emit(item);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
