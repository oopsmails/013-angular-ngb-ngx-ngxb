import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-selector',
  templateUrl: './home.selector.component.html',
  styleUrls: ['./home.selector.component.scss'],
})
export class HomeSelectorComponent<T extends { name: string }> implements OnInit {
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
    console.log('input options: ', this.options);
    console.log('selectedTemplateRef: ', this.selectedTemplateRef);
    console.log('optionTemplateRef: ', this.optionTemplateRef);
  }

  selectOption(option: T) {
    this.picked = option;
    this.selectionChanged.emit(option);
  }
}
