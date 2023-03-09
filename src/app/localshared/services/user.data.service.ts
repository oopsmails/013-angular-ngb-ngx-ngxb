import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { USERS_DATA } from '../../data/users.data';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  //   getUserData(delayInMs?: number): Observable<User[]> {
  //     let delay = 0;
  //     if (delayInMs) {
  //       delay = delayInMs;
  //     }

  //     let result$: Observable<User[]> = of([]);

  //     setTimeout(() => {
  //       result$ = of(USERS_DATA);
  //     }, delayInMs);

  //     return result$;
  //   }

  getUserData(delayInMs?: number): Observable<User[]> {
    return of(USERS_DATA);
  }
}
