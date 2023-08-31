import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap, Observable, takeUntil, Subject, map } from 'rxjs';
import { Customer } from '../../models/shared-model';

@Component({
  selector: 'app-input-save',
  templateUrl: './input-save.component.html',
  styleUrls: ['./input-save.component.scss'],
})
export class InputSaveComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  inputModel: string = '';

  customers$: Observable<Customer[]>;
  customers: Customer[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.customers$ = this.httpClient
      .get('http://localhost:8080/customers')
      .pipe(tap((resp: Customer[]) => console.log('........ length = ', resp.length))) as Observable<Customer[]>;

    // this.httpClient
    //   .get('http://localhost:8080/customers')
    //   .pipe(
    //     takeUntil(this.onDestroy$),
    //     tap((resp: Customer[]) => console.log('........ length = ', resp.length))
    //     // map((response) => {
    //     //   console.log(response);
    //     //   return response as Customer[];
    //     // })
    //   )
    //   .subscribe((resp: Customer[]) => {
    //     this.customers = resp;
    //   });
  }

  saveInput(event) {
    console.log('saving event: ', event);
    console.log('saving inputModel: ', this.inputModel);

    // const body = '{ "firstName": "John\n","lastName": "Doe-' + this.inputModel + '", "age": 138 }';
    const body = this.inputModel;

    this.httpClient
      .put('http://localhost:8080/customers/test/1408', body)
      .pipe(tap((resp) => console.log('1. returning ... ', JSON.stringify(resp))))
      .subscribe((resp) => {
        console.log('2. returning ... ', resp);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
