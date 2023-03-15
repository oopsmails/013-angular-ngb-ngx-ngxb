import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar-scroll',
  templateUrl: './progress-bar-scroll.component.html',
  styleUrls: ['./progress-bar-scroll.component.scss'],
})
export class ProgressBarScrollComponent {
  private COMPONENT_NAME = 'ProgressBarScrollComponent';

  @Input() progress: number;

  constructor() {}
}
