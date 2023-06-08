import { Component, OnDestroy, OnInit } from '@angular/core';

interface Branch {
  branchName: string;
  branchFaxNumber: string;
  branchAddress: string[];
  showSublist: boolean;
}

@Component({
  selector: 'app-eg-select-sublist4',
  templateUrl: './eg.select.sublist4.component.html',
  styleUrls: ['./eg.select.sublist4.component.scss'],
})
export class ExamplesSelectSublist4Component implements OnInit {
  branches: Branch[] = [
    {
      branchName: 'Branch 1',
      branchFaxNumber: '123456789',
      branchAddress: ['Address 1', 'Address 1A'],
      showSublist: false,
    },
    {
      branchName: 'Branch 2',
      branchFaxNumber: '987654321',
      branchAddress: ['Address 2', 'Address 2A'],
      showSublist: false,
    },
    {
      branchName: 'Branch 3',
      branchFaxNumber: '456789123',
      branchAddress: ['Address 3', 'Address 3A'],
      showSublist: false,
    },
  ];

  selectedBranch: Branch | null = null;
  selectedAddress: string | null = null;
  toggleDropdown = false;
  sublistTimeout: any;

  constructor() {}

  ngOnInit() {}

  onSelect(branch: Branch) {
    this.selectedBranch = branch;
    this.toggleDropdown = false;
  }

  toggleMenu() {
    this.toggleDropdown = !this.toggleDropdown;
  }

  showSublist(branch: Branch) {
    clearTimeout(this.sublistTimeout);
    branch.showSublist = true;
  }

  hideSublist() {
    this.sublistTimeout = setTimeout(() => {
      this.branches.forEach((branch) => {
        branch.showSublist = false;
      });
    }, 2000);
  }

  selectAddress(address: string) {
    this.selectedAddress = address;
    clearTimeout(this.sublistTimeout);
  }
}
