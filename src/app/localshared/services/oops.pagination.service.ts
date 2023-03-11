import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OopsPaginationService<T> {
  constructor() {}

  getPaginatedItems(items: T[], currentPage: number, itemsPerPage: number): Observable<T[]> {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    return of(paginatedItems);
  }

  getRangedItems(items: T[], startIndex: number, endIndex: number): Observable<T[]> {
    const paginatedItems = items.slice(startIndex, endIndex);
    return of(paginatedItems);
  }
}
