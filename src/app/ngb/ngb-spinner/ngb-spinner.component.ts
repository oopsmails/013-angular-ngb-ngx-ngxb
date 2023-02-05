import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RandomItem, SharedDataService } from 'oops-lib002';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ngb-spinner',
  templateUrl: './ngb-spinner.component.html',
  styleUrls: ['./ngb-spinner.component.scss'],
})
export class NgbSpinnerComponent implements OnInit {
  isLoading = true;
  modalReference: any;
  randomItems$: Observable<RandomItem[]>;
  constructor(private sharedDataService: SharedDataService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.randomItems$ = this.sharedDataService.getRandomItems(30, 2000);
  }

  showLoading(loadingModal) {
    this.isLoading = true;
    this.modalReference = this.modalService.open(loadingModal, { centered: true });
  }
  hideLoading() {
    this.isLoading = false;
    this.modalReference.close();
  }
}
