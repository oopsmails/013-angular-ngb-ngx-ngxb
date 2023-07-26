import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Inject, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { I18nService } from 'src/app/localshared/services/i18n.service';
import { UserDataService } from 'src/app/localshared/services/user.data.service';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';

@Component({
  selector: 'app-home',
  templateUrl: './eg.home.component.html',
  styleUrls: ['./eg.home.component.scss'],
})
export class ExamplesHomeComponent implements OnInit, OnDestroy {
  public static MAX_INPUT_LENGTH = 5;

  private onDestroy$: Subject<boolean> = new Subject();

  selectedLanguage: 'EN' | 'FR' = 'EN';

  numArray: number[] = [];

  myProperty: string = 'Initial Value';

  @Inject(LOCALE_ID) localeId: string;

  constructor(
    private router: Router,
    private decimalPipe: DecimalPipe,
    private sharedDataService: SharedDataService,
    private i18nService: I18nService,
    private userDataService: UserDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.numArray.push(3.14159265359);

    // fix #1
    // this.updateProperty();
  }

  ngAfterViewInit() {
    // Simulating a property update after the view has been fully initialized
    // This will cause "ExpressionChangedAfterItHasBeenCheckedError"
    this.updateProperty();
  }

  updateProperty() {
    // Updating the property value after the view has been initialized
    this.myProperty = 'Updated Value';

    // fix #2,
    setTimeout(() => {
      // Updating the property value outside the change detection cycle
      this.myProperty = 'Updated Value';
      // Trigger manual change detection
      this.cdr.detectChanges();
    }, 0);
  }

  onSelectedLanguageChange(event: string) {
    console.log('onSelectedLanguageChange, event = ', event);
    this.userDataService.currentLanguage = event;
    let localeVar = this.userDataService.currentLanguage === 'EN' ? 'en' : 'fr';
    this.setLocale(localeVar);

    // this.getRoundNumber()
  }

  setLocale(locale: string) {
    this.localeId = locale;
    registerLocaleData(locale === 'fr' ? localeFr : localeEn, locale);
    console.log('localeId: ', this.localeId);
  }

  getRoundNumber(num: number, locale?: string): string | null {
    // console.log('localeId: ', this.localeId);

    // let roundRules = '1.0-2';
    let roundRules = '4.1-3';
    let localRules = 'fr';

    // return this.decimalPipe.transform(num, roundRules) ?? '0';
    // return this.decimalPipe.transform(num, roundRules, localRules) ?? '0';
    // return this.decimalPipe.transform(num, roundRules, this.localeId) ?? '0';
    return this.decimalPipe.transform(num, roundRules, locale) ?? '0';
  }

  navToPage(page) {
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
