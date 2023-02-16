import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService, StateService, UsState } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  states$: Observable<UsState[]>;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.states$ = this.stateService.getUsStateCity();
  }

  navToPage(page) {
    console.log('HomeComponent, navToPage, page = ' + page);
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
