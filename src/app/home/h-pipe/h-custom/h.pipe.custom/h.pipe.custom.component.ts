import { Component, OnInit } from '@angular/core';
import { CustomPipe } from 'src/app/localshared/pipe/custom.pipe';

@Component({
  selector: 'app-h.pipe.custom',
  templateUrl: './h.pipe.custom.component.html',
  styleUrls: ['./h.pipe.custom.component.scss'],
  providers: [CustomPipe],
})
export class HPipeCustomComponent implements OnInit {
  myValue = 'aaa';
  myValueTransformed: any;
  myValueParsed: any;

  constructor(private customPipe: CustomPipe) {}

  ngOnInit(): void {
    this.myValueTransformed = this.customPipe.transform(this.myValue);
    this.myValueParsed = this.customPipe.parse(this.myValue);
  }

  onInputChange(newValue: any) {
    // Apply the pipe's 'parse' method (if defined) to transform the value back
    // this.myValue = this.customPipe.parse(newValue);

    this.myValueTransformed = this.customPipe.transform(this.myValue);
    this.myValueParsed = this.customPipe.parse(this.myValue);
  }
}
