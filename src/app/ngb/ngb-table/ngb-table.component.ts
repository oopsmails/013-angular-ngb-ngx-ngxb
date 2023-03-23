import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryDataService } from 'src/app/localshared/services/country.data.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/localshared/services/sortable.directive';

@Component({
  selector: 'app-ngb-table',
  templateUrl: './ngb-table.component.html',
  styleUrls: ['./ngb-table.component.scss'],
  providers: [CountryDataService, DecimalPipe],
})
export class NgbTableComponent implements OnInit {
  private COMPONENT_NAME = 'NgbTableComponent';

  @Input('inputCountry') inputCountry: Country;
  @Output() selectCountryEvent = new EventEmitter(true);

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public countryDataService: CountryDataService) {
    this.countries$ = countryDataService.countries$;
    this.total$ = countryDataService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    console.log(this.COMPONENT_NAME + ', onSort .....');
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.countryDataService.sortColumn = column;
    this.countryDataService.sortDirection = direction;
  }

  ngOnInit(): void {}

  onCountryClick(item) {
    console.log(this.COMPONENT_NAME + ', onCountryClick ....., item = ', item);
    this.selectCountryEvent.emit(item);
  }

  // sortTable(sortKey) {
  //   this.sortKey = sortKey;
  //   this.reverse = !this.reverse;
  //   this.data = this.data.sort((a, b) => {
  //     if (a[sortKey] < b[sortKey]) {
  //       return this.reverse ? 1 : -1;
  //     }
  //     if (a[sortKey] > b[sortKey]) {
  //       return this.reverse ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }
}
