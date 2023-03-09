import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car, CarDataService } from 'oops-lib002';
import { Subject, Observable, tap, distinctUntilChanged, debounceTime, switchMap, of, map, catchError } from 'rxjs';

@Component({
  selector: 'app-input-searchable',
  templateUrl: './input-searchable.component.html',
  styleUrls: ['./input-searchable.component.scss'],
})
export class InputSearchableComponent<T> {
  @Input() items: T[];
  @Input() fieldToDisplay: string;
  filteredItems: T[];
  searchText: string = '';

  ngOnChanges() {
    this.filterItems();
  }

  filterItems() {
    if (!this.items) return;
    this.filteredItems = this.items.filter((item) =>
      item[this.fieldToDisplay].toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
