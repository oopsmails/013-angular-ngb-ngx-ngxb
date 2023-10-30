import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject, takeUntil, catchError, of, tap, switchMap, concatMap } from 'rxjs';
import { Product } from 'src/app/localshared/models/shared-model';
import { ProductService } from 'src/app/localshared/services/product.service';

@Component({
  selector: 'app-eg.saving.05',
  templateUrl: './eg.saving.05.component.html',
  styleUrls: ['./eg.saving.05.component.scss'],
})
export class EgSaving05Component implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();

  product$: Observable<Product>;
  product: Product;

  isSaving = false;

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
          console.error('Error during radio button selection saving:', error);
          return of(null);
        })
      )
      .subscribe((item) => {
        console.log('ngOnInit, subscribe ....', item);
        this.product = item;
      });
  }

  inputOnBlurSave() {
    this.saveProduct('inputOnBlurSave');
  }

  checkboxClickSave() {
    // this.product.onlineOnly = !this.product.onlineOnly;
    this.saveProduct('checkboxClickSave');
  }

  saveProduct(fromMethod: string) {
    console.log(`saveProduct: ${fromMethod}: ${this.product}`);
    this.productService
      .putProduct(this.product)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response: Product) => console.log(`Product in tap ${fromMethod}: ${JSON.stringify(response)})`)),
        catchError((error) => {
          console.error(`An error occurred while updating the product: ${this.product}`, error);
          return of(null);
        })
      )
      .subscribe((response) => {
        this.product = response; // if without this, not trigger error ... but console showing old version
        console.log(`Product updated successfully ${fromMethod}: ${JSON.stringify(response)}`);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
