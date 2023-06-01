import { Component, OnDestroy, OnInit } from '@angular/core';
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

  selectedLanguage: 'EN' | 'FR' = 'EN';

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private i18nService: I18nService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {}

  onSelectedLanguageChange(event: string) {
    console.log('onSelectedLanguageChange, event = ', event);
    this.userDataService.currentLanguage = event;
  }

  navToPage(page) {
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
