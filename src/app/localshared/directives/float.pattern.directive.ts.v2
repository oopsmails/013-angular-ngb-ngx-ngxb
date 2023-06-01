import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserDataService } from '../services/user.data.service';

@Directive({
  selector: '[floatPattern]',
})
export class FloatPatternDirective implements OnChanges {
  @Input() maxDigitsBeforeDecimal: number = 3;
  @Input() maxDigitsAfterDecimal: number = 2;

  private regex: RegExp;

  constructor(private el: ElementRef) {
    this.generateRegex();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxDigitsBeforeDecimal || changes.maxDigitsAfterDecimal) {
      this.generateRegex();
    }
  }

  private generateRegex() {
    this.regex = new RegExp(`^[0-9]{0,${this.maxDigitsBeforeDecimal}}(\\.[0-9]{0,${this.maxDigitsAfterDecimal}})?$`);
  }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const inputValue: string = this.el.nativeElement.value;
    if (!this.regex.test(inputValue)) {
      this.el.nativeElement.value = inputValue.slice(0, -1);
    }
  }
}
