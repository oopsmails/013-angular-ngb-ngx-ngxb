import { Component, OnDestroy, OnInit } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-ngx-home',
  templateUrl: './ngx-home.component.html',
  styleUrls: ['./ngx-home.component.scss'],
})
export class NgxHomeComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public items$: Observable<RandomItem[]>;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
