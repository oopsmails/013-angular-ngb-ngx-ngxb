import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ExamplesRoutingModule } from './examples/eg-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { ExamplesModule } from './examples/eg.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {
    const subModuleRoutes = ExamplesRoutingModule.routes;
    console.log(subModuleRoutes);
  }

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

  shouldDisplayHeader(): boolean {
    const currentPath = this.router.url;
    // Add any additional logic here to determine if the header should be displayed
    // return currentRoute !== 'html';

    // why this is showing infinite times!!!???
    console.log('calling multiple time? currentPath: ', currentPath);

    return true;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
