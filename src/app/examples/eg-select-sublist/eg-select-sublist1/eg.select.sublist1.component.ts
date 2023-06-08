import { Component, OnDestroy, OnInit } from '@angular/core';

interface Branch {
  branchName: string;
  branchFaxNumber: string;
  branchAddress: string;
}

@Component({
  selector: 'app-eg-select-sublist1',
  templateUrl: './eg.select.sublist1.component.html',
  styleUrls: ['./eg.select.sublist1.component.scss'],
})
export class ExamplesSelectSublist1Component implements OnInit {
  branches: Branch[] = [
    {
      branchName: 'Branch 1',
      branchFaxNumber: '123456789',
      branchAddress: 'Address 1',
    },
    {
      branchName: 'Branch 2',
      branchFaxNumber: '987654321',
      branchAddress: 'Address 2',
    },
    {
      branchName: 'Branch 3',
      branchFaxNumber: '456789123',
      branchAddress: 'Address 3',
    },
  ];

  selectedBranch: Branch | null = null;
  toggleDropdown = false;

  constructor() {}

  ngOnInit() {}

  onSelect(branch: Branch) {
    this.selectedBranch = branch;
    this.toggleDropdown = false;
  }

  toggleMenu() {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
