import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngbd-tooltip-tplcontent',
  // standalone: true,
  // imports: [NgbTooltipModule],
  templateUrl: './ngb.tooltip.component.html',
  styleUrls: ['./ngb.tooltip.component.scss'],
})
export class NgbTooltipComponent {
  public static MAX_INPUT_LENGTH = 5;
  name = 'World';

  iconTop2 = '100%';
  iconLeft2 = '300%';
  iconBgColor2 = 'lightyellow';

  iconTop3 = '100%';
  iconLeft3 = '300%';
  iconBgColor3 = 'lightgreen';

  iconTop4 = '100%';
  iconLeft4 = '50%';
  iconBgColor4 = 'lightblue';

  myInput: string = '';
  tooltipMessage: string = 'Maximum 25 characters allowed';
  isInputInvalid: boolean = false;

  constructor() {
    setTimeout(() => {
      this.tooltipMessage = '';
    }, 3000);
  }

  onInputDivMessage(event: any) {
    if (event.target.value.length > NgbTooltipComponent.MAX_INPUT_LENGTH) {
      this.isInputInvalid = true;
      this.tooltipMessage = 'Maximum length exceeded';
      this.myInput = event.target.value.substring(0, NgbTooltipComponent.MAX_INPUT_LENGTH);
      setTimeout(() => {
        this.isInputInvalid = false;
      }, 2000);
    } else {
      this.isInputInvalid = false;
    }
  }

  onInuputChange(event: string) {
    console.log('onInuputChange, event = ', event);
    if (event.length > NgbTooltipComponent.MAX_INPUT_LENGTH) {
      this.isInputInvalid = true;
      this.tooltipMessage = 'Maximum length exceeded';

      setTimeout(() => {
        this.isInputInvalid = false;
        this.myInput = event.substring(0, NgbTooltipComponent.MAX_INPUT_LENGTH);
      }, 1000);
    } else {
      this.isInputInvalid = false;
    }
  }

  onInput(event: any) {
    if (event.target.value.length > NgbTooltipComponent.MAX_INPUT_LENGTH) {
      this.isInputInvalid = true;
      this.tooltipMessage = 'Maximum length exceeded';
      setTimeout(() => {
        this.isInputInvalid = false;
      }, 3000);
    } else {
      this.isInputInvalid = false;
    }
  }
}
