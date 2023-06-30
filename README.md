# angular-ngb-ngx-ngxb

## How to use ng command within this workspace

```
alias ng="./node_modules/.bin/ng"

ng g c html/html-cards

```

## Issues

```
10% building 3/3 modules 0 active(node:37268) [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)

Refs:
https://github.com/howtographql/howtographql/issues/1370

https://stackoverflow.com/questions/67503242/how-to-fix-node12364-dep0111-deprecationwarning-access-to-process-binding

- not solved by adding following in package.json, through

used npm, may have to try to use yarn:

yarn remove @prisma/cli
yarn add prisma --dev
yarn upgrade @prisma/client


"prisma": "^4.7.1",
```

### Extra "?? results available" showing on page for NGB typeahead

https://github.com/ng-bootstrap/ng-bootstrap/issues/2457

```
@valentinabojan it's due to the class="sr-only"; it should be hidden.

I don't think you're adding Bootstrap CSS properly / have a very custom bootstrap CSS build. I suggest you fix this, not try to hide the element.

Otherwise just add display: none; for sr-only. We won't remove it, because it is there for a11y support.

- my fix, since this css MUST be "loaded" once before opening any ngb typeahead page, it is a better choice to put following in app-nav-bar.cpmponent.scss ... or may in in footer.component.scss ...

::ng-deep .sr-only {
    display: none;
}

```

## index

### "example/search-city">Search City Filter

- Using Filter

### "example/search-cause">Search RootCause Filter

- Using Filter

### "example/search-inst">Search Institution Filter

- Using Filter

### "example/search-plant">Search Plant Filter

- Using Filter

### "example/state">Search State switchMap

- ref: https://blog.bitsrc.io/rxjs-switchmap-operator-4b045e2fbbda
- demo: https://stackblitz.com/edit/angular-ivy-qzykyn?file=src%2Fapp%2Fapp.component.ts
- Using component switchMap
- Using debounceTime and distinctUntilChanged

### "example/inst">Search Institution Http

- Using component http
- Not using switchMap, multiple http requests, overlapping, may cause inaccurate result.

### "example/inst2">Search Institution2 Http

- Using component http
- Using switchMap
- Using debounceTime and distinctUntilChanged
- ref: https://www.credera.com/insights/using-rxjs-switchmap-angular-7-reactive-forms-cancel-pending-requests
- demo: https://rslayter.github.io/switchmap-example/
- github: https://github.com/rslayter/switchmap-example

### Datatables

- 013-angular-ngb-ngx-ngxb\src\app\homemade\hm-datatable1, 2, 3, 4
- 1: basic, sort, pagination with only Prev and Next
- 2: sort, filter, pagination
- 3: sort with up, down arrows, only one, big
- 3: search input, with a down arrow, try CSS postion
- 4: sort with up, down arrows, both are located but showing only one, show depending on sort orders
- 4: for icons src\app\homemade\hm-datatable4\hm-datatable4.component.html, would show both, one solid and one hollow based on sorting order, NOT implemented ..., prepare for 5
- 5: Messed up, would show both arrows, one solid and one hollow based on sorting order ... ready for TODO
- 6: All good for using simple arrows
- 7: All good for using solid arrows
- 8: All good, using svgs from Bootstrap Icons as sorting arrows. But NOT npm install bootstrap-icons.
- 8: !!!!! A lot of things (about ngTemplateOutlet) to be tested and used in future !!!!! src\app\homemade\hm-datatable8\hm-datatable8.component.00.html
- 8: ONLY to revise th height?? 20230320

```
in order to use, for example, class="bi bi-caret-up-fill", what additional lib should I include?
The "bi bi-caret-up-fill" icon classes are part of the Bootstrap Icons library, which is a separate icon library from the Font Awesome library that we used earlier.

To use Bootstrap Icons in your Angular app, you can follow these steps:

Install the Bootstrap Icons package using npm:

Copy code
npm install bootstrap-icons
In the angular.json file of your Angular project, add the following entry to the styles array:

python
Copy code
"node_modules/bootstrap-icons/font/bootstrap-icons.css"
This will import the Bootstrap Icons CSS file into your project.

In your Angular component, you can use the Bootstrap Icons classes to display icons, for example:

php
Copy code
<i class="bi bi-caret-up-fill"></i>
```

### Lazy loading, scroll loading

please generate an Angular example, implement lazy loading or infinite scrolling to gradually load more items from the backend as the user scrolls down. please use "https://jsonplaceholder.typicode.com/posts" as mock backend

- src\app\home\h-scroll-load\h.scroll.load.component.ts
  GB, css, fixed height, good for scroll up NOT loading, but it is not only controlled by maxPosts, but also controlled by `scrollTop + offsetHeight >= scrollHeight`, which is used to control no loading for scrolling up.

  Another issue is when initial load NOT overflow, then there is no scroll bar, thus, lazy loading cannot be triggered at all.

  This may stay as is ... hard to be 100% perfect ... but trying more options in _h.scroll.load2.component.ts_.

- src\app\home\h-scroll-load2\h.scroll.load2.component.ts

See _Thinking on this_, and implemented.

- src\app\home\h-scroll-load3\h.scroll.load3.component.ts, JUST trying around!!!

  GB css, 100% height, but not good for initial load smaller or equal initial div height, i.e, no scroll bar initially, so, cannot trigger lazy loading. Tried load more initially ... but not successful ...

> Thinking on this, like _h.scroll.load.component.ts_, using fixed height div and make sure load more item initially to ensure, if there more, a scroll bar showing up initially!
> So far (20230312), _h-scroll-load2_ is a perfect version!
> `height: 100%;` // initially, want to use this instead of using fixed height, for controlling by maxPosts, but causing so much issues.
> Why, sometimes, ctrl + shift + i, NOT working??? all fixed by not using `height: 100%;`

## Errors

### add localize

Please run `ng add @angular/localize` from the Angular CLI

```
package.json

"@angular/localize": "~10.1.3",

src\polyfills.ts, add

import '@angular/localize/init';

```

### ??? pauseOnFocus cannot be recognized in src\app\home\pages\ngb-carousel-cycle\ngb.carousel.cycle.component.html

```
  [pauseOnFocus]="pauseOnFocus"

```
