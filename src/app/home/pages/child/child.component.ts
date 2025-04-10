import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectComponent } from 'ngx-select-ex';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { UserDataService } from 'src/app/localshared/services/user.data.service';

@Component({
  selector: 'app-child',
  // template: ` {{ message }} `,
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit, OnChanges {
  private compmentName: string = 'ChildComponent';
  private onDestroy$: Subject<boolean> = new Subject();

  @Input() message: string;
  @Input() inputObject: any;
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild('content') private content: TemplateRef<any>; // this will also work
  @ViewChild('selectComp', { static: false }) selectComp: NgxSelectComponent;
  // @ViewChild('selectComp', { static: false }) selectComp: ElementRef;

  randomItems$: Observable<RandomItem[]>;

  moreItem: RandomItem = { id: -1, name: 'More items ...' };
  selectedItem = -1;

  currentLocale: string = '';
  localeControlValue: string = 'aaa';

  constructor(
    private userDataService: UserDataService,
    private sharedDataService: SharedDataService,
    private modalService: NgbModal
  ) {
    // setTimeout(() => {
    //   this.messageEvent.emit(this.message);
    // }, 1000);
    // this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
  }

  ngOnInit() {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000).pipe(
      map((ret) => {
        ret.push(this.moreItem);
        return ret;
      })
    );

    this.userDataService.currentLocale$.pipe(takeUntil(this.onDestroy$)).subscribe((curLoc) => {
      this.currentLocale = curLoc;
      this.updateLocaleControlValue();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges: ', changes.inputObject.currentValue);
    this.updateLocaleControlValue();
  }

  updateLocaleControlValue() {
    console.log('updateLocaleControlValue: ', this.currentLocale);
    if ('EN' === this.currentLocale.toUpperCase()) {
      this.localeControlValue = 'EEEEEE';
    } else if ('FR' === this.currentLocale.toUpperCase()) {
      this.localeControlValue = 'FFFFFF';
    }
  }

  openModal(content, item) {
    // console.log('content=', content);
    console.log('item=', item);
    this.selectedItem = item;

    this.messageEvent.emit(item);

    if (item && item === -1) {
      setTimeout(() => {
        console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
        this.selectComp.focusToInput();
        console.log(this.compmentName, 'receivedMessage, this.selectComp 2 =', this.selectComp);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      }, 0);
    }

    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    // this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }); // This will also work!
  }

  openDropdown($event) {
    console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
    // let el = $event;
    // let nativeEl = this.selectComp;

    setTimeout(() => this.selectComp.optionsOpen(), 0);
    // .optionsOpen();
  }
}
