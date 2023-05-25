import { ColorEnum, DirectionEnumSimple, getColorEnumName } from '../../../localshared/models/shared-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService, Car } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { DirectionEnum } from 'src/app/localshared/models/shared-model';
import { OopsPaginationService } from 'src/app/localshared/services/oops.pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/localshared/services/i18n.service';

interface RandomItemExt extends RandomItem {
  type?: string;
  displayType?: boolean;
}

export enum MyColorEnum {
  RED,
  GREEN,
  BLUE,
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

  directions: string[] = Object.values(DirectionEnumSimple).map((value) => String(value));
  directionEnumSimple = DirectionEnumSimple;
  direectionOptions = [
    { value: '', displayKey: 'OPTION.SELECT' },
    { value: DirectionEnumSimple[DirectionEnumSimple.UP], displayKey: 'DIRECTION.UP' },
    { value: DirectionEnumSimple[DirectionEnumSimple.DOWN], displayKey: 'DIRECTION.DOWN' },
    { value: DirectionEnumSimple[DirectionEnumSimple.LEFT], displayKey: 'DIRECTION.LEFT' },
    { value: DirectionEnumSimple[DirectionEnum.RIGHT], displayKey: 'DIRECTION.RIGHT' },
  ];

  colorSelected: string;
  colors = Object.values(ColorEnum);

  public selectedColor: ColorEnum | null = null;
  private colorTranslations: Map<ColorEnum, string> = new Map();

  removeShouldBeDisabled: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
    private translate: TranslateService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    const colorValue: string = 'Red';
    const colorEnum: ColorEnum = ColorEnum[colorValue];

    this.colorSelected = '';

    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
    this.translate.currentLang = 'fr'; // this is used in I18nService

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, test translateService-1: ',
      this.i18nService.getJsonValueI18n('COLOR.colors.RED')
    );

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, test translateService-2: ',
      this.i18nService.getJsonValueI18n('TEST_DESCRIPTION')
    );

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, Enum to string, only simple: DirectionEnumSimple[DirectionEnumSimple.DOWN] = ',
      DirectionEnumSimple[DirectionEnumSimple.DOWN]
    );

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, Enum to string: String(DirectionEnumSimple.UP) = ',
      String(DirectionEnumSimple.UP)
    );

    const myColor = MyColorEnum.RED;

    console.log(this.COMPONENT_NAME + ', ngOnInit, Enum to string: myColor.toString() = ', myColor.toString());

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, Enum to string, only simple: MyColorEnum[MyColorEnum.RED] = ',
      MyColorEnum[MyColorEnum.RED]
    );

    console.log(
      this.COMPONENT_NAME + ', ngOnInit, Enum to string: getColorEnumName(ColorEnum.GREEN) = ',
      getColorEnumName(ColorEnum.GREEN)
    );

    this.initializeColorTranslations();

    this.items$ = this.sharedDataService.getRandomItems(30, 500);

    this.directions.push('Select ...');
    this.addNewRow();
  }

  getDirectionEnumValues() {
    return Object.keys(this.directionEnumSimple).filter((type) => isNaN(<any>type) && type !== 'values');
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
      displayType: true,
    });
    this.removeShouldBeDisabled = this.editItems.length <= 1;
  }

  onCustomKeySelected(item, idx) {
    console.log(this.COMPONENT_NAME + ', onCustomKeySelected, item = ', item);

    if (typeof item === 'string') {
      this.editItems[idx].customKey = item;
      return;
    }

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
        this.editItems = this.editItems.slice(1, this.editItems.length);
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

    this.removeShouldBeDisabled = this.editItems.length <= 1;
  }

  onTypeChange(event, idx) {
    this.editItems[idx].type = event;
    if (event || '' !== '') {
      this.editItems[idx].displayType = false;
    } else {
      this.editItems[idx].displayType = true;
    }
  }

  private initializeColorTranslations(): void {
    this.colorTranslations.set(ColorEnum.RED, this.i18nService.getJsonValueI18n('COLOR.colors.RED'));
    this.colorTranslations.set(ColorEnum.YELLOW, this.i18nService.getJsonValueI18n('COLOR.colors.YELLOW'));
    this.colorTranslations.set(ColorEnum.BLUE, this.i18nService.getJsonValueI18n('COLOR.colors.BLUE'));
    this.colorTranslations.set(ColorEnum.GREEN, this.i18nService.getJsonValueI18n('COLOR.colors.GREEN'));
  }

  public getColorTranslation(color: ColorEnum): string {
    return this.colorTranslations.get(color);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
