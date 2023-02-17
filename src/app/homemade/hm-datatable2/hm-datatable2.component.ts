import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-hm-datatable2',
  templateUrl: './hm-datatable2.component.html',
  styleUrls: ['./hm-datatable2.component.scss'],
})
export class HmDatatable2Component implements OnInit {
  users: User[] = [
    { name: 'John', age: 25, email: 'john@example.com' },
    { name: 'Jane', age: 32, email: 'jane@example.com' },
    { name: 'Bob', age: 18, email: 'bob@example.com' },
    { name: 'Mary', age: 27, email: 'mary@example.com' },
    { name: 'Alex', age: 20, email: 'alex@example.com' },
    { name: 'Alice', age: 24, email: 'alice@example.com' },
    { name: 'John2', age: 25, email: 'john@example.com' },
    { name: 'Jane2', age: 32, email: 'jane@example.com' },
    { name: 'Bob2', age: 18, email: 'bob@example.com' },
    { name: 'Mary2', age: 27, email: 'mary@example.com' },
    { name: 'Alex2', age: 20, email: 'alex@example.com' },
    { name: 'Alice2', age: 24, email: 'alice@example.com' },
  ];

  sortedUsers: User[] = [];
  currentPage = 1;
  pageSize = 3;
  pagedUsers: User[] = [];
  searchTerm = '';

  constructor() {}

  ngOnInit(): void {
    this.sort('name');
  }

  sort(property: string) {
    this.sortedUsers = this.users.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    this.filter();
    this.goToPage(1);
  }

  filter() {
    if (!this.searchTerm) {
      return;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    this.sortedUsers = this.sortedUsers.filter((user) => {
      return Object.values(user).some((val) => {
        return val.toString().toLowerCase().includes(searchTermLower);
      });
    });
  }

  clearFilter() {
    this.searchTerm = '';
    this.sort('name');
  }

  get totalPages() {
    return Math.ceil(this.sortedUsers.length / this.pageSize);
  }

  get pages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.sortedUsers.length);
    this.pagedUsers = this.sortedUsers.slice(startIndex, endIndex);
  }
}
