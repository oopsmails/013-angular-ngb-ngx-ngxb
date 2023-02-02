import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { GithubService, GitHubUser, GitHubUserSearchResponse, StateService } from 'oops-lib002';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  noop,
  Observable,
  Observer,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'ngb-typeahead-search',
  templateUrl: './ngxb.typeahead.search.component.html',
  styleUrls: ['./ngxb.typeahead.search.component.scss'],
})
export class NgxbTypeaheadSearchComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  searching = false;
  searchFailed = false;
  searchText?: string;
  selectedOption: GitHubUser;
  previewOption: GitHubUser;
  suggestions$?: Observable<GitHubUser[]>;
  // suggestions?: GitHubUser[]; // typeaheadOnPreview not working NOT because of async
  errorMessage?: string;

  constructor(
    private stateService: StateService,
    private http: HttpClient,
    private githubService: GithubService
  ) {}

  ngOnInit() {
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.searchText);
    }).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term: string) => {
        console.log('searching .... term: ', term || '[no search term!]');
        if (term) {
          // using github public api to get users by name
          return this.http
            .get<GitHubUserSearchResponse>('https://api.github.com/search/users', {
              params: { q: term },
            })
            .pipe(
              map((data: GitHubUserSearchResponse) => (data && data.items) || []),
              tap(() => (this.searchFailed = false)),
              catchError((err) => {
                this.searchFailed = true;
                this.errorMessage = (err && err.message) || 'Something goes wrong';
                return of([]);
              })
            );
        }

        return of([]);
      }),
      takeUntil(this.onDestroy$)
    );

    // this.suggestions$.subscribe((ret) => (this.suggestions = ret));
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  onPreview(event: TypeaheadMatch): void {
    // NOT working in version 6.2.0
    console.log('onPreview: ', (event && event.item) || '[event undefined]');
    if (event) {
      this.previewOption = event.item;
    } else {
      this.previewOption = null;
    }
  }

  ngOnInit_0() {
    this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.searchText);
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          // using github public api to get users by name
          return this.http
            .get<GitHubUserSearchResponse>('https://api.github.com/search/users', {
              params: { q: query },
            })
            .pipe(
              map((data: GitHubUserSearchResponse) => (data && data.items) || []),
              tap(
                () => noop,
                (err) => {
                  // in case of http error
                  this.errorMessage = (err && err.message) || 'Something goes wrong';
                }
              )
            );
        }

        return of([]);
      })
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
