import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { DirectionEnum } from 'src/app/localshared/models/shared-model';
import { I18nService } from 'src/app/localshared/services/i18n.service';
import { ColorEnum, DirectionEnumSimple, getColorEnumName } from '../../localshared/models/shared-model';

interface RandomItemExt extends RandomItem {
  type?: string;
  displayTypeSelect?: boolean;
  descErrorMessage?: string;
  disableDesc?: boolean;
  disableCustomKey?: boolean;
}

export enum MyColorEnum {
  RED,
  GREEN,
  BLUE,
}

@Component({
  selector: 'app-random-list-table2',
  templateUrl: './h.random.list.table4.component.html',
  styleUrls: ['./h.random.list.table4.component.scss'],
})
export class HomeRandomListTable4Component implements OnInit, OnDestroy {
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
    { value: DirectionEnumSimple[DirectionEnumSimple.RIGHT], displayKey: 'DIRECTION.RIGHT' },
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

    this.colorSelected = '';

    const myColor = MyColorEnum.RED;

    this.initializeColorTranslations();

    this.items$ = this.sharedDataService.getRandomItems(30, 500);

    this.directions.push('Select ...');
    this.addNewRow(5);
  }

  getDirectionEnumValues() {
    return Object.keys(this.directionEnumSimple).filter((type) => isNaN(<any>type) && type !== 'values');
  }

  getEnumKeyFromValue(enumObj: any, value: string): string | undefined {
    const keys = Object.keys(enumObj).filter((k) => enumObj[k] === value);
    return keys.length > 0 ? keys[0] : undefined;
  }

  onRowClick(item) {
    console.log('onRowClick, item = ', item);
  }

  onEditableRowClick(item) {
    console.log('onEditableRowClick, item = ', item);
  }

  onSelectColor(event) {
    console.log('onSelectColor, event = ', event);
    this.colorSelected = event;
  }

  addNewRow(numOfRows: number) {
    for (let i = 0; i < numOfRows; i++) {
      this.editItems.push({
        id: null,
        name: '',
        desc: '',
        customKey: '',
        type: '',
        displayTypeSelect: true,
        descErrorMessage: '',
      });
    }

    this.removeShouldBeDisabled = this.editItems.length <= 1;
  }

  onCustomKeySelected(item, idx) {
    console.log('onCustomKeySelected, item = ', item);

    if (typeof item === 'string') {
      this.editItems[idx].customKey = item;
      return;
    }

    if (item && item.eventSource && item.eventSource === 'inputOnTabKeydown') {
      console.log('from child onCustomKeySelected, item = ', item);
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

  changeInputItem() {
    console.log('testing changeInputItem ...');
    this.editItems[0].customKey = new Date().toLocaleTimeString();
  }

  onTypeChange(event, idx) {
    this.editItems[idx].type = event;
    // if (event !== '') {
    //   this.editItems[idx].displayTypeSelect = false;
    // } else {
    //   this.editItems[idx].displayTypeSelect = true;
    // }

    if (event === 'RIGHT') {
      this.editItems[idx].disableDesc = true;
      this.editItems[idx].disableCustomKey = true;
      this.editItems[idx].desc = 'From Right';
      this.editItems[idx].customKey = 'From Right';
      this.editItems[idx].displayTypeSelect = false;
    } else {
      if (event !== '') {
        this.editItems[idx].disableDesc = false;
        this.editItems[idx].disableCustomKey = false;
        this.editItems[idx].displayTypeSelect = false;
        this.editItems[idx].desc = '';
        this.editItems[idx].customKey = '';
      } else {
        this.editItems[idx].displayTypeSelect = true;
      }
    }
  }

  onDescChange(event, idx) {
    if (this.editItems[idx].desc === '') {
      this.editItems[idx].descErrorMessage = '';
      return;
    }
    // const allowed_pattern = new RegExp('^[0-9]{1,14}(\\.[0-9]{1,3})?$');
    const allowed_pattern = new RegExp('^[0-9]{1,4}?$');
    if (!allowed_pattern.test(this.editItems[idx].desc)) {
      this.editItems[idx].descErrorMessage = 'Please verify your input ...';
    } else {
      this.editItems[idx].descErrorMessage = '';
      // this.editItems[idx].desc = event.substring(0, event.length - 1); // should NOT do this
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
