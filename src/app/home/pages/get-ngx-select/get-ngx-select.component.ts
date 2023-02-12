import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectComponent } from 'ngx-select-ex';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-ngx-select',
  templateUrl: './get-ngx-select.component.html',
  styleUrls: ['./get-ngx-select.component.scss'],
})
export class GetNgxSelectComponent implements OnInit {
  name = 'Angular';
  @ViewChild('dropdown') dropdown: NgxSelectComponent;

  // public items: string[] = [
  //   'Amsterdam',
  //   'Antwerp',
  //   'Athens',
  //   'Barcelona ',
  //   'Berlin',
  //   'Birmingham',
  //   'Bradford',
  //   'Bremen',
  //   'Brussels',
  //   'Bucharest',
  //   'Budapest',
  //   'Cologne',
  //   'Copenhagen',
  //   'Dortmund',
  //   'Dresden',
  //   'Dublin',
  //   'Düsseldorf',
  //   'Essen',
  //   'Frankfurt',
  //   'Genoa',
  //   'Glasgow',
  //   'Gothenburg',
  //   'Hamburg',
  //   'Hannover',
  //   'Helsinki',
  //   'Kraków',
  //   'Leeds',
  //   'Leipzig',
  //   'Lisbon',
  //   'London',
  //   'Madrid',
  //   'Manchester',
  //   'Marseille',
  //   'Milan',
  //   'Munich',
  //   'Málaga',
  //   'Naples',
  //   'Palermo',
  //   'Paris',
  //   'Poznań',
  //   'Prague',
  //   'Riga',
  //   'Rome',
  //   'Rotterdam',
  //   'Seville',
  //   'Sheffield',
  //   'Sofia',
  //   'Stockholm',
  //   'Stuttgart',
  //   'The Hague',
  //   'Turin',
  //   'Valencia',
  //   'Vienna',
  //   'Vilnius',
  //   'Warsaw',
  //   'Wrocław',
  //   'Zagreb',
  //   'Zaragoza',
  //   'Łódź',
  // ];

  public itemId = 1;
  public manualSearch = '';

  randomItems$: Observable<RandomItem[]>;
  randomItems: RandomItem[];

  constructor(private sharedDataService: SharedDataService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
    // this.randomItems$.subscribe((ret) => (this.randomItems = ret));
  }

  searchText($event, text) {
    let nativeEl = this.dropdown;

    // this.dropdown.focus.pipe(first()).subscribe(f=> {
    //   document.execCommand('insertText', false /*no UI*/, text);
    // });

    setTimeout(() => this.dropdown.optionsOpen(text), 100);
    // this.openDropdown($event);
  }

  openDropdown($event) {
    console.log('this.dropdown=', this.dropdown);
    let el = $event;
    let nativeEl = this.dropdown;

    setTimeout(() => this.dropdown.optionsOpen(), 100);
    // .optionsOpen();
  }

  dropDownJSON() {
    return JSON.stringify(this.dropdown);
  }
}
