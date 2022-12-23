import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { GitHubUser, GitHubUserSearchResponse } from '../models/shared.model';

const GITHUB_URL = 'https://api.github.com/search/users';

@Injectable()
export class GithubService {
  errorMessage?: string;
  constructor(private http: HttpClient) {}

  search(term: string): Observable<GitHubUser[]> {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<GitHubUserSearchResponse>(GITHUB_URL, {
        params: { q: term },
      })
      .pipe(
        map((data: GitHubUserSearchResponse) => (data && data.items) || []),
        catchError((err) => {
          this.errorMessage = (err && err.message) || 'Something goes wrong';
          console.log('GithubService, search: ', term, this.errorMessage);
          return of([]);
        })
      );
  }
}
