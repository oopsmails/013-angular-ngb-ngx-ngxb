import { Component, OnInit } from '@angular/core';
import { SharedDataService, RandomItem } from 'oops-lib002';
import { concatMap, catchError, of, Observable } from 'rxjs';

@Component({
  selector: 'app-eg.saving.02',
  templateUrl: './eg.saving.02.component.html',
  styleUrls: ['./eg.saving.02.component.scss'],
})
export class EgSaving02Component implements OnInit {
  isSaving = false; // Flag to track if a save operation is in progress
  inputValue = '';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {}

  onSaveBlurAndRadio(item: any) {
    if (!this.isSaving) {
      this.isSaving = true;
      console.log('################ 1. isSaving ....', this.isSaving);

      // Wrap the validateAndSaveToBackend logic in a new Observable
      const validateObsFromV1 = new Observable<void>((observer) => {
        // Perform the input validation and saving to the backend
        // Example: Make an HTTP request to validate and save data to the backend
        this.validateAndSaveToBackendV1(item).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
      });

      // const validateObs = of(this.validateAndSaveToBackend(item));
      const validateObs = new Observable<RandomItem[]>((observer) => {
        try {
          const data = this.validateAndSaveToBackend(item);
          observer.next(data);
          observer.complete();
        } catch (error) {
          observer.error(error); // Emit an error if something goes wrong
        }
      });

      validateObs
        .pipe(
          concatMap(() => {
            this.isSaving = false;
            console.log('################ 2. isSaving ....', this.isSaving);
            return of(null); // Return an empty observable to continue the sequence
          }),
          catchError((error) => {
            console.error('Error during input validation and saving:', error);
            this.isSaving = false;
            console.log('################ 2 error. isSaving ....', this.isSaving);
            return of(null); // Return an empty observable to continue the sequence
          })
        )
        .subscribe();
    }
  }

  validateAndSaveToBackend(item: any): RandomItem[] {
    console.log('validateAndSaveToBackend, passed in item.target.value: ', item.target.value);
    // if already subscribed
    let result: RandomItem[] = [];
    this.sharedDataService.getRandomItems(5, 5000).subscribe((items) => {
      console.log('should be 11111111111, onSaveBlurAndRadio subscribe ....', items);
      result = items;
    });
    return result;
  }

  validateAndSaveToBackendV1(item: any): Observable<RandomItem[]> {
    // Validate the input and perform the saving to the backend
    // Example: Make an HTTP request to validate and save data to the backend
    // return this.http.post('backend-url', item);
    console.log('validateAndSaveToBackend, passed in item.target.value: ', item.target.value);
    return this.sharedDataService.getRandomItems(5, 3000);
  }

  onSaveRadio(item: any): RandomItem[] {
    if (!this.isSaving) {
      let result: RandomItem[] = [];
      this.sharedDataService
        .getRandomItems(5, 3000)
        .pipe(
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
}

/**

To create an Observable from a method that returns a string, you can use the Observable.create method in RxJS. 
This method allows you to manually create an Observable by defining its behavior and emission logic. 
Here's how you can do it:


// Create an Observable that emits the string returned from the method
const stringObservable = new Observable<string>((observer) => {
  try {
    const data = getStringData(); // Call your method to get the string data
    observer.next(data); // Emit the string data to the subscribers
    observer.complete(); // Complete the Observable (optional)
  } catch (error) {
    observer.error(error); // Emit an error if something goes wrong
  }
});

// Subscribe to the Observable to receive the emitted string
stringObservable.subscribe(
  (data: string) => {
    console.log('Received data:', data);
  },
  (error: any) => {
    console.error('Error occurred:', error);
  },
  () => {
    console.log('Observable completed.');
  }
);



 */
