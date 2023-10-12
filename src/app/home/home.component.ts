import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StateService, UsState } from 'oops-lib002';
import {
  concatMap,
  delay,
  exhaustMap,
  flatMap,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Institution } from '../models/inst';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private COMPONENT_NAME = 'HomeComponent';

  private onDestroy$: Subject<boolean> = new Subject();

  scrollProgress: number = 0;

  states$: Observable<UsState[]>;

  insts$: Observable<Institution[]>;
  filteredInsts$: Observable<Institution[]>;

  institution: Institution = new Institution();

  todoItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  completedItems = ['Item 6'];
  draggedItem: any;

  currentDate: Date = new Date();
  myObject = { name: 'John', age: 30, city: 'New York' };

  second: string = '[second from component.ts!]';

  isVisible = false;

  originalString1 = 'This \\\three backslashes is a \n sample string with  backslashes.';
  originalString2 = 'This \\\\three backslashes is a \\n sample string with \\ backslashes.';
  stringWithDoubleBackslashes1 = '';
  stringWithDoubleBackslashes2 = '';

  stringfield = '';

  constructor(private stateService: StateService, private router: Router, private translate: TranslateService) {
    // https://www.youtube.com/watch?v=2zJRw3Cl_Vs&list=RDCMUCssWuTdNCWN4RSF3wHzzjMw&index=12
    const example = (operator: any) => () => {
      from([0, 1, 2, 3, 4])
        .pipe(
          takeUntil(this.onDestroy$),
          operator((x: any) => of(x).pipe(delay(500))),
          tap({
            next: console.log,
            error: console.error,
            complete: () => console.log(`${operator.name} completed`),
          })
        )
        .subscribe();
    };

    // example(map)();
    // example(flatMap)();
    setTimeout(() => example(mergeMap)()); // get all into final result, order dosen't matter!
    setTimeout(() => example(switchMap)()); // search, cancel previous request
    setTimeout(() => example(exhaustMap)()); // from 0, it already gets the observable, so, after are all ignored!
    setTimeout(() => example(concatMap)()); // getUser first, then getUserDetails in order, need to use concatMap
  }

  ngOnInit() {
    this.states$ = this.stateService.getUsStateCity();

    this.stringWithDoubleBackslashes1 = this.originalString1.replace(/\\/g, '\\\\');
    this.stringWithDoubleBackslashes2 = this.originalString2.replace(/\\/g, '\\\\');

    console.log(this.stringWithDoubleBackslashes1);
    console.log(this.stringWithDoubleBackslashes2);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // console.log(this.COMPONENT_NAME + ', onScroll .................');
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;
  }

  dragStart(event: any, item: any) {
    console.log(this.COMPONENT_NAME + ', dragStart, item = ' + item);
    this.draggedItem = item;
  }

  dragOver(event: any) {
    event.preventDefault();
  }

  drop(event: any, target: string) {
    event.preventDefault();
    const index = this.todoItems.indexOf(this.draggedItem);
    const targetArray = target === 'completed' ? this.completedItems : this.todoItems;
    const targetIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    if (target === 'completed') {
      this.todoItems.splice(index, 1);
    } else {
      this.completedItems.splice(index, 1);
    }
    targetArray.splice(targetIndex, 0, this.draggedItem);
  }

  // drop(event: any, type: string) {
  //   console.log(this.COMPONENT_NAME + ', drop, type = ' + type);
  //   event.preventDefault();
  //   const data = event.dataTransfer.getData('text/plain');
  //   const target = event.target;
  //   const targetContainer = type === 'completed' ? this.completedItems : this.todoItems;

  //   if (!data || !target) {
  //     return;
  //   }

  //   // If the source and target containers are the same, move the item instead of duplicating it
  //   if (this.draggedItem && this.draggedItem.container === target) {
  //     const index = this.getIndex(event.clientY, target);
  //     const itemIndex = targetContainer.indexOf(data);
  //     targetContainer.splice(itemIndex, 1);
  //     targetContainer.splice(index, 0, data);
  //     this.draggedItem.index = index;
  //   } else {
  //     // If the item is dropped onto the completed container, remove it from the todo-items container
  //     if (type === 'completed') {
  //       const itemElement = event.target.querySelector(`[draggable][data-item="${data}"]`);
  //       if (itemElement && itemElement.parentNode) {
  //         itemElement.parentNode.removeChild(itemElement);
  //       }
  //     }
  //     targetContainer.push(data);
  //     this.draggedItem = { container: target, index: targetContainer.length - 1 };
  //   }
  // }

  getIndex(clientY: number, container: HTMLElement): number {
    const children = Array.from(container.children);
    return children.findIndex((child: HTMLElement) => {
      const { top, bottom } = child.getBoundingClientRect();
      const middle = (top + bottom) / 2;
      return clientY > middle;
    });
  }

  onModelChange(inString: string) {
    return (this.institution.englishName = inString.replace(/\\/g, '\\\\'));
  }

  navToPage(page) {
    console.log(this.COMPONENT_NAME + ', navToPage, page = ' + page);
    this.router.navigateByUrl(page);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
