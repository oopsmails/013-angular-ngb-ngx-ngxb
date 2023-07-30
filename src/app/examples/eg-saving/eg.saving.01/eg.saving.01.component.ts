import { Component, OnInit } from '@angular/core';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { concatMap, of, catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-eg.saving.01',
  templateUrl: './eg.saving.01.component.html',
  styleUrls: ['./eg.saving.01.component.scss'],
})
export class EgSaving01Component implements OnInit {
  isSaving = false; // Flag to track if a save operation is in progress
  inputValue = '';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {}

  onSaveBlurAndRadio(item: any) {
    if (!this.isSaving) {
      this.isSaving = true;

      // Perform the input validation and saving to the backend using concatMap
      this.validateAndSaveToBackend(item)
        .pipe(
          // concatMap(() => { // if returning void, to keep continue the sequence
          //   this.isSaving = false;
          //   return of(null); // Return an empty observable to continue the sequence
          // }),
          concatMap((items) => {
            this.isSaving = false;
            return items; // Return an empty observable to continue the sequence
          }),
          catchError((error) => {
            console.error('Error during input validation and saving:', error);
            this.isSaving = false;
            return of(null); // Return an empty observable to continue the sequence
          })
        )
        .subscribe((items) => {
          console.log('should be 11111111111, onSaveBlurAndRadio subscribe ....', items);
        });
    }
  }

  validateAndSaveToBackend(item: any): Observable<RandomItem[]> {
    // Validate the input and perform the saving to the backend
    // Example: Make an HTTP request to validate and save data to the backend
    // return this.http.post('backend-url', item);
    console.log('validateAndSaveToBackend, passed in item.target.value: ', item.target.value);
    return this.sharedDataService.getRandomItems(5, 5000);
  }

  onSaveRadio(item: any): RandomItem[] {
    if (!this.isSaving) {
      // Perform the radio button selection saving to the backend using tap
      // this.http
      //   .post('backend-url', item)
      //   .pipe(
      //     catchError((error) => {
      //       console.error('Error during radio button selection saving:', error);
      //       return of(null); // Return an empty observable to handle errors gracefully
      //     })
      //   )
      //   .subscribe();

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
