import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Car } from 'src/app/shared/models';
import { CarDataService } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-test-around',
  templateUrl: './hm.dropdown.search.component.html',
  styleUrls: ['./hm.dropdown.search.component.scss'],
})
export class HomeMadeDropdownSearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchText') searchTextElement: ElementRef;

  private onDestroy$: Subject<boolean> = new Subject();

  carItems$: Observable<Car[]>;

  errorMessage?: string;
  model: Car;
  searching = false;
  searchFailed = false;
  showDropdown = false;

  public selectedValue: any;
  public searchValue: any;
  public filteredList: Car[] = [];
  public allItems: Car[] = [];

  constructor(private carDataService: CarDataService) {}
  ngOnInit() {
    this.carDataService.getCarItems(1000, 2000).subscribe((resp: Car[]) => {
      resp.forEach((item) => {
        item.description = item.brand + ' - ' + item.model + ' : ' + item.year;
      });
      this.filteredList = resp;
      this.allItems = resp;
    });
  }

  dropdownOnClick() {
    console.log('dropdownOnClick ');
    this.filteredList = this.allItems;
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown === true) {
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.searchTextElement.nativeElement.focus();
      }, 0);
    }
  }

  filterDropdown(e) {
    console.log('e in filterDropdown -------> ', e);
    // window.scrollTo(window.scrollX, window.scrollY + 1);
    let searchString = e.toLowerCase();
    if (!searchString) {
      this.filteredList = this.allItems.slice();
      return;
    } else {
      this.filteredList = this.allItems.filter(
        (item) => item.description.toLowerCase().indexOf(searchString) > -1
      );
    }
    // window.scrollTo(window.scrollX, window.scrollY - 1);
    console.log('filterDropdown, this.filteredList.length: ', this.filteredList.length || '0');
  }

  selectValue(description) {
    this.selectedValue = description;
    this.showDropdown = false;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
