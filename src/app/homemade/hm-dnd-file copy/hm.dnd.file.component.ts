import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from '../hm.constants';

@Component({
  selector: 'app-hm-dropdown-search',
  templateUrl: './hm.dnd.file.component.html',
  styleUrls: ['./hm.dnd.file.component.scss'],
})
// Ref: https://procodeprogramming.com/blogs/file-drag-and-drop-in-angular-10
export class HomeMadeDragAndDropFileComponent {
  private COMPONENT_NAME = 'HomeMadeDragAndDropFileComponent';
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  allFiles: File[] = [];

  constructor() {}

  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }
}
