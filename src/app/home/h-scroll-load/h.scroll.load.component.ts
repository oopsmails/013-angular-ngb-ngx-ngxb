import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CarDataService } from 'oops-lib002';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-test-around',
  templateUrl: './h.scroll.load.component.html',
  styleUrls: ['./h.scroll.load.component.scss'],
})
/**
 * Angular example that implements lazy loading/infinite scrolling
 * to load more items from a mock backend as the user scrolls down
 */
export class HomeScrollLoadComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeScrollLoadComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  currentPage = 1;
  loading = false;
  posts: Post[] = [];
  maxPosts = 100;

  @ViewChild('postList') postList: ElementRef;

  constructor(private carDataService: CarDataService, private httpClient: HttpClient) {}
  ngOnInit() {
    // this.httpClient
    //   .get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_start=1&_limit=15`)
    //   .pipe(
    //     takeUntil(this.onDestroy$)
    //     // map((items) => {
    //     //   items.map((item) => item.title);
    //     // })
    //   )
    //   .subscribe((items) => {
    //     console.log(this.COMPONENT_NAME + ', ngOnInit, items.length = ', items.length || 'null-0');
    //     this.posts = items;
    //   });

    console.log(this.COMPONENT_NAME + ', ngOnInit');

    // this.loadPosts();
    this.loadPosts(0, 10);
  }

  onScroll() {
    const element = this.postList.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const offsetHeight = element.offsetHeight;

    if (scrollTop + offsetHeight >= scrollHeight) {
      const start = this.posts.length;
      const end = start + 10;
      this.loadPosts(start, end);
    }
  }

  loadPosts(start: number, end: number) {
    if (this.loading || this.posts.length === this.maxPosts) {
      return;
    }

    this.loading = true;
    this.httpClient
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _start: start.toString(),
          _end: end.toString(),
        },
      })
      .subscribe((posts) => {
        console.log(this.COMPONENT_NAME + ', loadPosts, pushing posts.length = ', posts.length || 'null-0');
        this.posts.push(...posts);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
