import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { I18nService } from 'src/app/localshared/services/i18n.service';

@Component({
  selector: 'app-home',
  templateUrl: './eg.select.component.html',
  styleUrls: ['./eg.select.component.scss'],
})
export class ExamplesSelectComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  @ViewChild('selectDropdown') selectDropdown: ElementRef;

  shouldShow: boolean = true;
  filterCollapsed: boolean = true;

  constructor(private router: Router, private sharedDataService: SharedDataService, private i18nService: I18nService) {}

  ngOnInit() {}

  onEnter() {
    console.log('onEnter ................');
  }

  // handleChange() {
  //   console.log('handleChange ................');
  // }

  select3OnChange() {
    console.log('select3OnClick ................');
    this.selectDropdown.nativeElement.click();
  }

  navToPage(page) {
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
