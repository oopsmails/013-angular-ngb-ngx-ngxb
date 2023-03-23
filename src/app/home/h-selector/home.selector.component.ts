import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { map, Observable, of, Subject } from 'rxjs';
import { INSTITUTIONS } from 'src/app/localshared/data/insts.data';
import { Institution } from 'src/app/models/inst';

@Component({
  selector: 'app-home-selector',
  templateUrl: './home.selector.component.html',
  styleUrls: ['./home.selector.component.scss'],
})
export class HomeSelectorComponent<T extends { name: string }> implements OnInit {
  private COMPONENT_NAME = 'HomeSelectorComponent';

  picked: T;

  @Input()
  label: string;

  @Input()
  options: T[];

  @Input('selectedTemplate')
  selectedTemplateRef: TemplateRef<any>;

  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef: TemplateRef<any>;

  @Output()
  selectionChanged = new EventEmitter<T>();

  ngOnInit() {
    console.log(this.COMPONENT_NAME + ', ngOnInit, options = ', this.options);
  }

  selectOption(option: T) {
    this.picked = option;
    this.selectionChanged.emit(option);
  }
}
