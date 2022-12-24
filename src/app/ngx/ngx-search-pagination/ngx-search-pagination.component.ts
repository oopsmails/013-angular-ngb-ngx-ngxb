import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Subject,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  throwError,
} from 'rxjs';
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
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page: any;

  constructor(private githubService: GithubService) {}

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search() {
    this.searchTerm
      .pipe(
        map((e: any) => {
          console.log(e.target.value);
          return e.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.loading = true;
          return this.githubService.searchRepos(term);
        }),
        catchError((e) => {
          //handle the error and return it
          console.log(e);
          this.loading = false;
          this.errorMessage = e.message;
          return throwError(e);
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
