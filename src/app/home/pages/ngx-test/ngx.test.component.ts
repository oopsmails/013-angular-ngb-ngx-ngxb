import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SharedDataService } from 'src/app/shared/services/shared.data.service';
import { HomeDataService } from '../../home.data.service';

@Component({
  selector: 'ngx-test',
  templateUrl: './ngx.test.component.html',
  styleUrls: ['./ngx.test.component.scss'],
})
export class NgxTestComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public items$: Observable<any[]>;
  public formControl = new FormControl(3);

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
