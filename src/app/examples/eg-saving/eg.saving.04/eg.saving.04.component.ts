import { BehaviorSubject, Observable, Subject, catchError, map, of, switchMap, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/localshared/models/shared-model';
import { ProductService } from 'src/app/localshared/services/product.service';

@Component({
  selector: 'app-eg.saving.04',
  templateUrl: './eg.saving.04.component.html',
  styleUrls: ['./eg.saving.04.component.scss'],
})
export class EgSaving04Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  product$: Observable<Product>;
  product: Product;

  private saveDataSubject = new BehaviorSubject<Product>(null);

  constructor(private productService: ProductService) {
    this.saveDataSubject.pipe(switchMap((data) => this.saveData(data))).subscribe();
  }

  ngOnInit(): void {
    this.product$ = this.productService.getProductById(1);

    this.productService
      .getProductById(1)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('Error during radio button selection saving:', error);
          return of(null);
        })
      )
      .subscribe((items) => {
        console.log('subscribe ....', items);
        this.product = items;
      });
  }

  saveDataPublic(data: Product): void {
    this.saveDataSubject.next(data);
  }

  private saveData(data: Product): Observable<Product> {
    return this.productService.putProduct(data);
  }

  triggerMultipleCalls(): Observable<Product> {
    console.log('triggerMultipleCalls:', this.product);
    this.productService
      .putProduct(this.product)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('An error occurred while updating the product:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('Product updated successfully:', response);
        this.product = response;
      });

    this.productService
      .putProduct(this.product)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('An error occurred while updating the product:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('Product updated successfully:', response);
        this.product = response;
      });

    return this.productService.getProductById(1);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
