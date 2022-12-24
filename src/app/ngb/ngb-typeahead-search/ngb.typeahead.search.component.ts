import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  OperatorFunction,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { GitHubUser } from 'src/app/shared/models/shared.model';
import { GithubService } from 'src/app/shared/services/github.service';
import { WikipediaService } from 'src/app/shared/services/wikipedia.service';

@Component({
  selector: 'ngb-typeahead-search',
  templateUrl: './ngb.typeahead.search.component.html',
  styleUrls: ['./ngb.typeahead.search.component.scss'],
})
export class NgbTypeaheadSearchComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject();
  model: any;
  searching = false;
  searchFailed = false;

  githubModel: GitHubUser;
  githubSearching = false;
  githubSearchFailed = false;

  constructor(private wikipediaService: WikipediaService, private githubService: GithubService) {}
  ngOnInit() {}

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.wikipediaService.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  searchGithub: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.githubSearching = true)),
      switchMap((term) =>
        this.githubService.searchUsers(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.githubSearching = false))
    );

  resultFormatter = (result: GitHubUser) => result.login;
  inputFormatter = (result: GitHubUser) => result.login;

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
