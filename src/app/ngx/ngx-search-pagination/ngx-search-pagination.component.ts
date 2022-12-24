import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  switchMap,
  throwError,
} from 'rxjs';
import { GitHubRepo } from 'src/app/shared/models';
import { GithubService } from 'src/app/shared/services/github.service';

/**
 * https://www.youtube.com/watch?v=39RkRpFk6dM
 */

@Component({
  selector: 'app-ngx-search-pagination',
  templateUrl: './ngx-search-pagination.component.html',
  styleUrls: ['./ngx-search-pagination.component.scss'],
})
export class NgxSearchPaginationComponent implements OnInit {
  public loading: boolean;
  public searchTerm = new Subject<string>();
  // public baseUrl = 'https://api.github.com/search/repositories';
  public searchResults: GitHubRepo[];
  public paginationElements: GitHubRepo[];
  public errorMessage: string;
  public page: number;

  constructor(private githubService: GithubService) {}

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search(): void {
    this.searchTerm
      .pipe(
        map((e: any) => {
          console.log(e.target.value);
          return e.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) => {
          this.loading = true;
          return this.githubService.searchRepos(term);
        }),
        catchError((e) => {
          //handle the error and return it
          console.log('Get error: ', e.message);
          this.loading = false;
          this.errorMessage = e.message;
          return throwError(() => new Error(this.errorMessage));
        })
      )
      .subscribe((v) => {
        this.loading = false;
        //return the results and pass the to the paginate module
        this.searchResults = v;
        this.paginationElements = this.searchResults;
      });
  }

  /*
  public search(){
    this.searchTerm.pipe(
      map((e: any) => e.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      filter( term => term.length > 0),
    ).subscribe( searchterm => {
      console.log(searchterm);
      this.loading = true;
      this._searchEntries(searchterm);
    });
  }
//this.baseUrl + this.queryUrl + term
  public searchEntries(term): Observable<any>{
    let params = {q: term}
    return this.httpClient.get(this.baseUrl, {params}).pipe(
      map(response => {
        console.log(response)
        this.searchResults = response["items"];
        this.paginationElements = this.searchResults;
      })
    )
  }

  public _searchEntries(term){
    this.searchEntries(term).subscribe(() => {
      this.loading= false;
    },
    err => {
      this.loading = false;
      console.log(err);
    }
    )
  }

*/
  ngOnInit(): void {
    this.search();
  }
}
