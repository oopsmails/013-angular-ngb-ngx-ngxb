import { EmitEventData } from './../../../localshared/models/shared-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ngx-select7-item',
  templateUrl: './ngx-select7-item.component.html',
  styleUrls: ['./ngx-select7-item.component.scss'],
})
export class NgxSelect7ItemComponent implements OnInit {
  @Input() option: any;
  @Output() selectedOption = new EventEmitter<any>(true);

  constructor() {}

  ngOnInit(): void {}

  itemHover(optionData) {
    // console.log('itemHover ... ', optionData);
    let emitEventData = new EmitEventData();
    emitEventData.eventSource = 'onItemHover';
    emitEventData.eventData = optionData;
    this.selectedOption.emit(emitEventData);
  }

  itemSelected(optionData) {
    // console.log('onItemSelected ... ', optionData);
    let emitEventData = new EmitEventData();
    emitEventData.eventSource = 'onItemSelected';
    emitEventData.eventData = optionData;
    this.selectedOption.emit(emitEventData);
  }
}
