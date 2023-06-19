import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { UserDataService } from '../services/user.data.service';

@Directive({
  selector: '[amtPattern]',
})
export class AmtPatternDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  private regex: RegExp = /^\d{0,3}(\.\d{0,2})?$/;

  constructor(private el: ElementRef, private userDataService: UserDataService) {}

  // @HostListener('keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   if (this.specialKeys.includes(event.key)) {
  //     return;
  //   }
  //   const current: string = this.el.nativeElement.value;

  //   const targetStr: string = current.concat(event.key);
  //   const regex =
  //     this.userDataService.currentLanguage === 'EN'
  //       ? new RegExp(/(^\d+\.?\d{0,2}$)|(^\.?\d{0,2}$)/g)
  //       : new RegExp(/(^\d+[,]?\d{0,2}$)|(^[,]?\d{0,2}$)/g);

  //   if (targetStr && !String(targetStr).match(regex)) {
  //     event.preventDefault();
  //   }
  // }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const inputValue: string = this.el.nativeElement.value;
    if (!this.regex.test(inputValue)) {
      this.el.nativeElement.value = inputValue.slice(0, -1);
    }
  }
}
