import { BehaviorSubject, Observable, Subject, catchError, concatMap, map, of, switchMap, takeUntil, tap } from 'rxjs';
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product$ = this.productService.getProductById(1).pipe(
      takeUntil(this.onDestroy$),
      catchError((error) => {
        console.error('Error during getProductById:', error);
        return of(null);
      })
    );

    this.productService
      .getProductById(1)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('Error during getProductById:', error);
          return of(null);
        })
      )
      .subscribe((item) => {
        console.log('subscribe ....', item);
        this.product = item;
      });

    this.saveDataSubject.pipe(
      tap((item) => {
        console.log('saveDataSubject ....', item);
        if (!item || !item.id) {
          return of(null);
        }
      }),
      takeUntil(this.onDestroy$),
      catchError((error) => {
        console.error('An error occurred while updating the product:', error);
        return of(null);
      }),
      switchMap((item) => {
        if (item && item.id) {
          this.saveData(item);
          return of(item);
        }
      })
    );
    // .subscribe(() => {
    //   // console.log('subscribe ....', item);
    //   // this.product = item;
    // });
  }

  saveDataPublic(): void {
    this.saveDataSubject.next(this.product);
    this.saveDataSubject.next(this.product);
  }

  saveDataPublic2(data: Product): void {
    console.log('saveDataPublic2 ....', data);
    if (data && data.id) {
      this.saveDataSubject.next(this.product);
      this.saveDataSubject.next(this.product);
    }
  }

  private saveData(data: Product): Observable<Product> {
    return this.productService.putProduct(data);
  }

  triggerMultipleCalls2(): Observable<Product> {
    // just for testing, not for reproducing the issue
    this.productService
      .putProduct(this.product)
      .pipe(
        concatMap(() => this.productService.getProductById(this.product.id)),
        concatMap(() => this.productService.putProduct(this.product))
      )
      .subscribe((response) => {
        console.log('triggerMultipleCalls, Product updated successfully:', response);
        this.product = response;
      });

    return this.productService.getProductById(1);
  }

  triggerMultipleCalls(): Observable<Product> {
    console.log('triggerMultipleCalls:', this.product);
    this.productService
      .putProduct(this.product)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('An error occurred while updating the product:', error, this.product);
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('Product updated successfully 1111111111:', response);
        this.product = response;
      });

    console.log('!!!!!!!!!!!! If put GET in middle, then no optimistic locking problem !!!!!!!!!!!!!!!');

    // if put GET in between 2 PUTs, then no optimistic lock Exception
    // this.productService
    //   .getProductById(1)
    //   .pipe(
    //     takeUntil(this.onDestroy$),
    //     catchError((error) => {
    //       console.error('Error during radio button selection saving:', error);
    //       return of(null);
    //     })
    //   )
    //   .subscribe((item) => {
    //     console.log('subscribe ....', item);
    //     this.product = item;
    //   });

    this.productService
      .putProduct(this.product)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('An error occurred while updating the product:', error, this.product);
          return of(null);
        })
      )
      .subscribe((response) => {
        console.log('Product updated successfully: 2222222222222222', response);
        this.product = response;
      });

    return this.productService.getProductById(1);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
