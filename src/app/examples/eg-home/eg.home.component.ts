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

  myInput: string = '';
  tooltipMessage: string = 'Maximum 25 characters allowed';
  isInputInvalid: boolean = false;

  constructor(private router: Router, private sharedDataService: SharedDataService, private i18nService: I18nService) {}

  ngOnInit() {}

  onInuputChange(event: string) {
    console.log('onInuputChange, event = ', event);
    if (event.length > ExamplesHomeComponent.MAX_INPUT_LENGTH) {
      this.isInputInvalid = true;
      this.tooltipMessage = 'Maximum length exceeded';

      setTimeout(() => {
        this.isInputInvalid = false;
        this.myInput = event.substring(0, ExamplesHomeComponent.MAX_INPUT_LENGTH);
      }, 1000);
    } else {
      this.isInputInvalid = false;
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
