import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSelectComponent } from 'ngx-select-ex';
import { Subject, takeUntil } from 'rxjs';
import { UserDataService } from 'src/app/localshared/services/user.data.service';

@Component({
  selector: 'app-parent',
  // template: `
  //   <app-child [message]="message" (messageEvent)="receivedMessage($event)"></app-child>
  // `,
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  private compmentName: string = 'ParentComponent';
  private onDestroy$: Subject<boolean> = new Subject();

  message = 'Hello from Parent Component!';
  inputObject: any = { prop1: 'value1', prop2: new Date().toLocaleTimeString() };

  manualSearch: string;

  @ViewChild('selectComp', { static: false }) selectComp: NgxSelectComponent;

  selectedLanguage: 'EN' | 'FR' = 'EN';

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {}

  receivedMessage(event) {
    console.log(this.compmentName, 'receivedMessage, event =', event);
    setTimeout(() => {
      console.log(this.compmentName, 'receivedMessage, this.selectComp =', this.selectComp);
    }, 0);
  }

  changeInputObject() {
    this.inputObject = { prop1: 'new value1', prop2: new Date().toLocaleTimeString() };
  }

  onSelectedLanguageChange(event: string) {
    console.log('onSelectedLanguageChange, event = ', event);
    this.userDataService.currentLocale$.next(event);
  }
}
