import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { I18nService } from 'src/app/localshared/services/i18n.service';

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

  constructor(private router: Router, private sharedDataService: SharedDataService, private i18nService: I18nService) {}

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
    const allowed_pattern = new RegExp('^[0-9]{1,5}?$');

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

  navToPage(page) {
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
