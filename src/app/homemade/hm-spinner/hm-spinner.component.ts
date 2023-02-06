import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavBarModel, RandomItem, SharedDataService } from 'oops-lib002';
import { delay, Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-hm-spinner',
  templateUrl: './hm-spinner.component.html',
  styleUrls: ['./hm-spinner.component.scss'],
})
export class HmSpinnerComponent implements OnInit {
  randomItems$: Observable<RandomItem[]>;
  navBarModels$: Observable<NavBarModel[]>;

  constructor(
    public loader: LoaderService,
    private sharedDataService: SharedDataService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
    // prettier-ignore, delay here will NOT help for testing spinner, need to use HttpDelayInterceptor
    this.navBarModels$ = this.httpClient
      .get('assets/config/nav-bar-config.json')
      .pipe(delay(2000)) as Observable<NavBarModel[]>;
  }
}
