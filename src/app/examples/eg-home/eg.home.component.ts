import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { I18nService } from 'src/app/localshared/services/i18n.service';
import { UserDataService } from 'src/app/localshared/services/user.data.service';

@Component({
  selector: 'app-home',
  templateUrl: './eg.home.component.html',
  styleUrls: ['./eg.home.component.scss'],
})
export class ExamplesHomeComponent implements OnInit, OnDestroy {
  public static MAX_INPUT_LENGTH = 5;

  private onDestroy$: Subject<boolean> = new Subject();

  myInput01: string = '';
  tooltipMessage01: string = 'Maximum 25 characters allowed';
  isInputInvalid01: boolean = false;

  myInput02: string = '';
  tooltipMessage02: string = '';
  isInputInvalid02: boolean = false;

  myInput03: string = '';
  tooltipMessage03: string = '';
  isInputInvalid03: boolean = false;

  myInput04: string = '';
  tooltipMessage04: string = '';
  isInputInvalid04: boolean = false;

  myInput05: number = 11.0;
  tooltipMessage05: string = '';
  isInputInvalid05: boolean = false;

  selectedLanguage: 'EN' | 'FR' = 'EN';
  myInput06: string = '';
  tooltipMessage06: string = '';
  isInputInvalid06: boolean = false;

  myInput07: string = '11.00';
  myInputNum07: number = 11.0;
  tooltipMessage07: string = '';
  isInputInvalid07: boolean = false;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private i18nService: I18nService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {}

  onInuputChange01(event: string) {
    console.log('onInuputChange, event = ', event);
    if (event.length > ExamplesHomeComponent.MAX_INPUT_LENGTH) {
      this.isInputInvalid01 = true;
      this.tooltipMessage01 = 'Maximum length exceeded';

      setTimeout(() => {
        this.isInputInvalid01 = false;
        this.myInput01 = event.substring(0, ExamplesHomeComponent.MAX_INPUT_LENGTH);
      }, 1000);
    } else {
      this.isInputInvalid01 = false;
    }
  }

  onInuputChange02(event) {
    console.log('onInuputChange02, event = ', event);

    const MAX_LENGTH = 8;
    const allowedRegex = /^[0-9]*\.?[0-9]*$/;

    if (!allowedRegex.test(this.myInput02)) {
      this.isInputInvalid02 = true;
      this.tooltipMessage02 = 'pattern violated ...';
    } else {
      if (this.myInput02.length > MAX_LENGTH) {
        // this.myInput02 = this.myInput02.slice(0, 14);
        this.isInputInvalid02 = true;
        this.tooltipMessage02 = 'max 8 chars ...';
      } else if (this.myInput02.length == MAX_LENGTH) {
        if (this.myInput02.indexOf('.') == MAX_LENGTH - 1) {
          this.isInputInvalid02 = true;
          this.tooltipMessage02 = 'decimal point cannot be at last ...';
        }
      } else {
        if (this.myInput02.includes('.')) {
          const decimalPart = this.myInput02.split('.')[1];
          if (decimalPart && decimalPart.length > 3) {
            // this.myInput02 = this.myInput02.slice(0, -(decimalPart.length - 3));
            this.isInputInvalid02 = true;
            this.tooltipMessage02 = 'more than 3 digits after decimal point is not allowed ...';
          }
        }
      }
    }

    if (this.isInputInvalid02) {
      setTimeout(() => {
        this.isInputInvalid02 = false;
        this.myInput02 = event.substring(0, this.myInput02.length - 1);
      }, 1000);
    }
  }

  onInuputChange03(event: string) {
    console.log('onInuputChange, event = ', event);
    const allowed_pattern = new RegExp('^[0-9]{1,14}(\\.[0-9]{1,3})?$');

    if (!allowed_pattern.test(this.myInput03)) {
      this.isInputInvalid03 = true;
      this.tooltipMessage03 = 'pattern violated ...';
    }
    if (this.isInputInvalid03) {
      setTimeout(() => {
        this.isInputInvalid03 = false;
        this.myInput03 = event.substring(0, this.myInput03.length - 1);
      }, 1000);
    }
  }

  onInuputChange04(event: string) {
    console.log('onInuputChange, event = ', event);
    // const allowed_pattern = new RegExp('^[0-9]{1,5}?$');
    // const allowed_pattern = new RegExp('^[0-9]*$');
    const allowed_pattern = new RegExp(/^\d{0,5}$/);
    // const allowed_pattern = new RegExp(/^\d+$/); // dirgit only
    // const allowed_pattern = new RegExp(/^\d{0,5}/); // need end
    // const allowed_pattern = new RegExp(/^\[0-9]{0,5}$/); // not working

    if (!allowed_pattern.test(this.myInput04)) {
      this.isInputInvalid04 = true;
      this.tooltipMessage04 = 'pattern violated ...';
    }
    if (this.isInputInvalid04) {
      setTimeout(() => {
        this.isInputInvalid04 = false;
        this.myInput04 = event.substring(0, this.myInput04.length - 1);
      }, 1000);
    }
  }

  onInuputChange05(event: string) {
    console.log('onInuputChange05, event = ', event);
  }

  onInuputChange06(event: string) {
    console.log('onInuputChange06, event = ', event);

    // Regular expression patterns for EN and FR formats
    // const enPattern = /^\d{0,9}(\.\d{0,3})?$/; // EN pattern: up to 9 digits, optional decimal point, up to 3 decimal places
    // const frPattern = /^\d{0,9}(\,\d{0,3})?$/; // FR pattern: up to 9 digits, optional decimal point (comma), up to 3 decimal places

    // let pattern: RegExp;

    // if (this.selectedLanguage === 'EN') {
    //   pattern = enPattern;
    // } else {
    //   pattern = frPattern;
    // }

    const pattern = this.getValidatePattern();

    // Validate the input against the selected language pattern
    if (!pattern.test(event)) {
      this.tooltipMessage06 = 'pattern test failed ...';
      this.isInputInvalid06 = true;
    }

    if (this.isInputInvalid06) {
      setTimeout(() => {
        this.isInputInvalid06 = false;
        this.myInput06 = event.substring(0, this.myInput06.length - 1);
      }, 500);
    }
  }

  onInuputChange07(event: string) {
    console.log('onInuputChange07, event = ', event);

    // const pattern = new RegExp(/^\d{0,5}$/);
    const pattern = this.getValidatePattern();

    if (!pattern.test(this.myInput07)) {
      this.isInputInvalid07 = true;
      this.tooltipMessage07 = 'pattern violated 1 ...';
    } else {
      const fixedInput = this.myInput07.replace(/,/g, '.');
      const inputNumber = parseFloat(fixedInput);
      if (isNaN(inputNumber) || inputNumber === 0) {
        this.isInputInvalid07 = true;
        this.tooltipMessage07 = 'pattern violated 2 ...';
      } else {
        this.myInputNum07 = inputNumber;
      }
    }

    if (this.isInputInvalid07) {
      setTimeout(() => {
        this.isInputInvalid07 = false;
        this.myInput07 = event.substring(0, this.myInput07.length - 1);
      }, 500);
    }
  }

  onSelectedLanguageChange(event: string) {
    console.log('onSelectedLanguageChange, event = ', event);
    this.userDataService.currentLanguage = event;
  }

  private getValidatePattern(): RegExp {
    const enPattern = /^\d{0,3}(\.\d{0,2})?$/; // EN pattern: up to 9 digits, optional decimal point, up to 3 decimal places
    const frPattern = /^\d{0,3}(\,\d{0,2})?$/; // FR pattern: up to 9 digits, optional decimal point (comma), up to 3 decimal places

    let pattern: RegExp;

    if (this.userDataService.currentLanguage === 'EN') {
      pattern = enPattern;
    } else {
      pattern = frPattern;
    }

    return pattern;
  }

  navToPage(page) {
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
