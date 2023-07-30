import { Component, OnInit } from '@angular/core';
import { SharedDataService, RandomItem } from 'oops-lib002';
import { concatMap, catchError, of, Observable, defer, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-eg.saving.03',
  templateUrl: './eg.saving.03.component.html',
  styleUrls: ['./eg.saving.03.component.scss'],
})
export class EgSaving03Component implements OnInit {
  private onDestroy$: Subject<boolean> = new Subject();

  isSaving = false; // Flag to track if a save operation is in progress
  validationCompleted$ = new Subject<void>();

  inputValue = '';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {}

  onSaveBlurAndRadio(item: any) {
    if (!this.isSaving) {
      this.isSaving = true;

      // Perform the input validation and saving to the backend
      // this.validateAndSaveToBackend(item).subscribe(
      //   () => {
      //     this.validationCompleted$.next(); // Signal the completion of validation
      //     this.isSaving = false;
      //   },
      //   (error) => {
      //     console.error('Error during input validation and saving:', error);
      //     this.isSaving = false;
      //   }
      // );

      this.validateAndSaveToBackend(item);
    }
  }

  validateAndSaveToBackend(item: any): RandomItem[] {
    console.log('validateAndSaveToBackend, passed in item.target.value: ', item.target.value);
    // if already subscribed
    let result: RandomItem[] = [];
    this.sharedDataService
      .getRandomItems(5, 2000)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => {
          console.error('Error during radio button selection saving:', error);
          this.isSaving = false;
          return of(null);
        })
      )
      .subscribe((items) => {
        console.log('should be 11111111111, onSaveBlurAndRadio subscribe ....', items);
        this.validationCompleted$.next(); // Signal the completion of validation
        this.isSaving = false;
        result = items;
      });
    return result;
  }

  onSaveRadio(item: any): RandomItem[] {
    console.log('################ onSaveRadio isSaving ....', this.isSaving);
    if (!this.isSaving) {
      let result: RandomItem[] = [];
      this.sharedDataService
        .getRandomItems(5, 1000)
        .pipe(
          takeUntil(this.onDestroy$),
          catchError((error) => {
            console.error('Error during radio button selection saving:', error);
            return of(null);
          })
        )
        .subscribe((items) => {
          console.log('should be 2222222222222222, onSaveRadio subscribe ....', items);
          result = items;
        });

      return result;
    }
  }

  // No need to use concatMap ... because disabled in html
  // onSaveRadio(item: any) {
  //   console.log('################ onSaveRadio isSaving ....', this.isSaving);
  //   if (!this.isSaving) {
  //     // Use concatMap with the validationCompleted$ subject to ensure the correct order of execution
  //     this.validationCompleted$
  //       .pipe(
  //         concatMap(() => {
  //           // Perform the radio button selection saving to the backend
  //           // Example: Make another HTTP request to save data to the backend
  //           console.log('here ......');
  //           return this.sharedDataService.getRandomItems(5, 3000);
  //         }),
  //         catchError((error) => {
  //           console.error('Error during radio button selection saving:', error);
  //           return of(null); // Return an empty observable to handle errors gracefully
  //         })
  //       )
  //       .subscribe((items) => {
  //         console.log('should be 2222222222222222, onSaveRadio subscribe ....', items);
  //         // Reset the validationCompleted$ subject for the next cycle
  //         this.validationCompleted$.next();
  //       });
  //   }
  // }
}
