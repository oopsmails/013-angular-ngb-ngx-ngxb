# angular-test

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
