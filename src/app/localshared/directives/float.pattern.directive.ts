import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { UserDataService } from '../services/user.data.service';

@Directive({
  selector: '[floatPattern]',
})
export class FloatPatternDirective implements OnChanges {
  @Input() maxDigitsBeforeDecimal: number = 3;
  @Input() maxDigitsAfterDecimal: number = 2;
  @Input() errorMessageSelector: string = 'floatPattern__error-message';

  private regex: RegExp;
  private errorMessageTimeout: any;
  private errorMessageElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
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
      this.showError();
      this.el.nativeElement.value = inputValue.slice(0, -1);
    } else {
      this.hideError();
    }
  }

  private showError() {
    this.hideError();

    const errorMessage = 'Invalid input';
    this.errorMessageElement = this.renderer.createElement('div');
    this.renderer.addClass(this.errorMessageElement, this.errorMessageSelector);
    const textNode = this.renderer.createText(errorMessage);
    this.renderer.appendChild(this.errorMessageElement, textNode);
    this.renderer.appendChild(this.el.nativeElement.parentElement, this.errorMessageElement);

    this.errorMessageTimeout = setTimeout(() => {
      this.hideError();
    }, 500);
  }

  private hideError() {
    clearTimeout(this.errorMessageTimeout);
    if (this.errorMessageElement) {
      this.renderer.removeChild(this.el.nativeElement.parentElement, this.errorMessageElement);
      this.errorMessageElement = null;
    }
  }
}
