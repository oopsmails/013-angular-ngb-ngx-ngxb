import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ColumnHeader, SortDirection } from 'src/app/models/sortable';
import { SortService } from '../../services/sort.service';

@Component({
  selector: '[sortable-column]',
  templateUrl: './sortable-column.component.html',
})
export class SortableColumnComponent implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  @Input('sortable-column') columnToSort: ColumnHeader;

  ngOnInit() {}

  ngOnDestroy() {}

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter')
  sort(event: KeyboardEvent | MouseEvent) {
    this.columnToSort.direction =
      this.columnToSort.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    this.sortService.columnSorted({
      column: this.columnToSort.column,
      direction: this.columnToSort.direction,
    });
  }
}
