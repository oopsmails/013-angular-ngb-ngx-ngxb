import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/services/sortable.directive';

@Component({
  selector: 'app-ngb-table',
  templateUrl: './ngb-table.component.html',
  styleUrls: ['./ngb-table.component.scss'],
  providers: [CountryService, DecimalPipe],
})
export class NgbTableComponent implements OnInit {
  private COMPONENT_NAME = 'NgbTableComponent';
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    console.log(this.COMPONENT_NAME + ', onSort .....');
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit(): void {}

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
