import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-ngb-modal',
  templateUrl: './ngb.modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class NgbModalComponent {
  private COMPONENT_NAME = 'NgbModalComponent';

  passingCountry: Country = {
    id: 13,
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  };

  closeResult: string;

  selectedCountry: Country;

  constructor(private modalService: NgbModal) {}

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  openCustomContent(customContent) {
    this.modalService.open(customContent, { scrollable: true });
  }

  recieveSelectCountryEvent(item) {
    console.log(this.COMPONENT_NAME + ', recieveSelectCountryEvent ....., item = ', item);
    this.selectedCountry = item;
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
  }
}
