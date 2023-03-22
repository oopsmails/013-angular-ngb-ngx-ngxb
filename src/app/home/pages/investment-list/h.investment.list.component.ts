import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, Subject } from 'rxjs';

interface Stock {
  investmentType: string;
  securityType: string;
  symbol: string;
  investmentDesc: string;
  investmentUnit: number;
  quantityAmt: number;
}

@Component({
  selector: 'app-invest-list',
  templateUrl: './h.investment.list.component.html',
  styleUrls: ['./h.investment.list.component.scss'],
})
export class HomeInvestmentListComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeInvestmentListComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  stocks: Stock[] = [
    // {
    //   investmentType: 'Stocks',
    //   securityType: 'Common Stock',
    //   symbol: 'AAPL',
    //   investmentDesc: 'Apple Inc',
    //   investmentUnit: 100,
    //   quantityAmt: 5000,
    // },
    // {
    //   investmentType: 'Stocks',
    //   securityType: 'Common Stock',
    //   symbol: 'AMZN',
    //   investmentDesc: 'Amazon.com Inc',
    //   investmentUnit: 50,
    //   quantityAmt: 2500,
    // },
    // {
    //   investmentType: 'Stocks',
    //   securityType: 'Common Stock',
    //   symbol: 'GOOG',
    //   investmentDesc: 'Alphabet Inc Class C',
    //   investmentUnit: 10,
    //   quantityAmt: 1000,
    // },
  ];

  stockForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.createForm();
  }

  ngOnInit() {}

  // private createForm() {
  //   this.stockForm = this.fb.group({
  //     investmentType: ['', Validators.required],
  //     securityType: '',
  //     symbol: '',
  //     investmentDesc: '',
  //     investmentUnit: '',
  //     quantityAmt: '',
  //   });
  // }

  // onSubmit() {
  //   console.log(this.stockForm.value);
  // }

  addNewRow() {
    this.stocks.push({
      investmentType: '',
      securityType: '',
      symbol: '',
      investmentDesc: '',
      investmentUnit: 100,
      quantityAmt: 5000,
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
