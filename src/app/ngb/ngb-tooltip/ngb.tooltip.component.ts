import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngbd-tooltip-tplcontent',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './ngb.tooltip.component.html',
  styleUrls: ['./ngb.tooltip.component.scss'],
})
export class NgbTooltipComponent {
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
}
