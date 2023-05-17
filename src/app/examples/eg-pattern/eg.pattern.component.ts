import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { I18nService } from 'src/app/localshared/services/i18n.service';

@Component({
  selector: 'eg-pattern',
  templateUrl: './eg.pattern.component.html',
  styleUrls: ['./eg.pattern.component.scss'],
})
export class ExamplesPatternComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private sharedDataService: SharedDataService, private i18nService: I18nService) {}

  ngOnInit() {
    this.decimalPatternTest();
    this.digitPatternTest();
  }

  decimalPatternTest() {
    const pattern = new RegExp('^[0-9]{1,9}(\\.[0-9]{1,2})?$');
    const patternTests: Map<string, boolean> = new Map();
    patternTests.set('1234567890.123', false);
    patternTests.set('1234567890.12', false);
    patternTests.set('123456789.123', false);
    patternTests.set('123456789.12', true);
    for (let [key, value] of patternTests) {
      const testResult = pattern.test(key);
      console.log('decimalPatternTest, for pattern, key, value, testResult: ', pattern, key, value, testResult);
      if (this.booleanCompare(testResult, value) !== 0) {
        console.log('#### decimalPatternTest, Result NOT as expected, for pattern: ', pattern, ', key: ', key);
      }
    }
  }

  digitPatternTest() {
    const pattern = new RegExp('^[0-9]{1,9}$');
    const patternTests: Map<string, boolean> = new Map();
    patternTests.set('1234567890.123', false);
    patternTests.set('1234567890.12', false);
    patternTests.set('123456789.123', false);
    patternTests.set('123456789.12', false);
    patternTests.set('1234567890', false);
    patternTests.set('123456789', true);
    patternTests.set('12389', true);
    for (let [key, value] of patternTests) {
      const testResult = pattern.test(key);
      console.log('digitPatternTest, for pattern, key, value, testResult: ', pattern, key, value, testResult);
      if (this.booleanCompare(testResult, value) !== 0) {
        console.log('#### digitPatternTest, Result NOT as expected, for decimalPattern: ', pattern, ', key: ', key);
      }
    }
  }

  private booleanCompare(a: boolean, b: boolean) {
    return Number(a) - Number(b);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
