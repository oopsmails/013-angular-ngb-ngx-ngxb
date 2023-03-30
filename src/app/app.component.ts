import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.translate
      .get('TEST_DESCRIPTION')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((translated: string) => {
        console.log('translated: ', translated);
        const translatedRed = this.translate.instant('COLOR.colors.RED');
        console.log('translatedRed: ', translatedRed);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
