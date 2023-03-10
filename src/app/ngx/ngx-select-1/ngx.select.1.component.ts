import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'ngx-test',
  templateUrl: './ngx.select.1.component.html',
  styleUrls: ['./ngx.select.1.component.scss'],
})
export class NgxSelect1Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  public formControl1 = new FormControl(2);
  public formControl2 = new FormControl(1);

  public items: RandomItem[];
  public items$: Observable<RandomItem[]>;
  public items2$: Observable<RandomItem[]>;

  //------------------------
  stockTypeOptions = ['ALL', 'STOCK', 'FUND'];
  marketOptions = ['ALL', 'CAN', 'USA'];
  fundTypeOptions = ['ALL', 'Alpha Fund', 'Mutual Fund'];
  selectedStockType = 'ALL';
  selectedMarket = 'ALL';
  selectedFundType = 'ALL';
  showMarketDropdown = false;
  showFundTypeDropdown = false;
  //--------------------------

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.items$ = this.sharedDataService.getRandomItems();
    this.items$.subscribe((resp) => {
      this.items = resp;
      this.items.forEach((item) => {
        item.customKey = item.id + ' - ' + item.name;
      });
    });

    this.items2$ = this.sharedDataService.getRandomItems(100, 1000).pipe(
      map((items) => {
        items.forEach((item) => {
          if (item.id === 8 || item.id === 10) {
            item.desc = 'abc'; // for testing onSearchCallback, if search bc or ab, should only see item8 and item10
          }
          item.customKey = '' + item.id + '-' + item.name + '-' + item.desc;
        });
        return items;
      })
    );
  }

  onSearchCallback(search: string, item: INgxSelectOption): boolean {
    // console.log(`onSearchCallback ........... searcht = `, search);
    // console.log(`onSearchCallback ........... item = `, item);

    const randomItem = <RandomItem>item.data;
    // console.log(`onSearchCallback ........... randomItem = `, randomItem);

    return (
      randomItem.name.toLowerCase().includes(search.toLowerCase()) ||
      randomItem.desc.toLowerCase().includes(search.toLowerCase())
    );
  }

  //------------------------------------

  onStockTypeChanged(event) {
    console.log(`onStockTypeChanged ........... event = `, event);
    if (this.selectedStockType === 'ALL') {
      this.showMarketDropdown = false;
      this.showFundTypeDropdown = false;
    } else if (this.selectedStockType === 'STOCK') {
      this.showMarketDropdown = true;
      this.showFundTypeDropdown = false;
      this.marketOptions = ['ALL', 'CAN', 'USA'];
    } else if (this.selectedStockType === 'FUND') {
      this.showMarketDropdown = true;
      this.showFundTypeDropdown = true;
      this.marketOptions = ['ALL', 'CAN', 'USA'];
    }
  }

  onMarketChanged() {
    if (this.selectedMarket === 'ALL') {
      this.fundTypeOptions = ['ALL'];
    } else {
      this.fundTypeOptions = ['ALL', 'Alpha Fund', 'Mutual Fund'];
    }
    this.selectedFundType = 'ALL';
  }
  //------------------------------------

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
