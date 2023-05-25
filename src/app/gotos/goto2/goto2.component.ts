import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goto-css-2',
  standalone: true,
  templateUrl: './goto2.component.html',
  styleUrls: ['./goto2.component.scss'],
})
export class GoTo2Component implements OnInit {
  codes: string[] = [];
  code1 = 'margin: 0 calc(-50vw + 50%); // this makes img full width VW';
  code2 = '@mixin triangle($size, $side, $left: 0, $top: 0, $color: red)';
  code3: string = '.even-columns-flex > * { flex: 100%; } ';
  // code4: string = '.even-columns-flex > * { flex: 100%; } ';

  constructor() {}

  ngOnInit(): void {
    this.codes.push(this.code1);
    this.codes.push(this.code2);
    this.codes.push(this.code3);
  }
}
