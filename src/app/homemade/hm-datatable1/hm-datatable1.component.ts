import { Component, OnInit } from '@angular/core';

interface User {
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-hm-datatable1',
  templateUrl: './hm-datatable1.component.html',
  styleUrls: ['./hm-datatable1.component.scss'],
})
export class HmDatatable1Component implements OnInit {
  users: User[] = [
    { name: 'John', age: 25, email: 'john@example.com' },
    { name: 'Jane', age: 32, email: 'jane@example.com' },
    { name: 'Bob', age: 18, email: 'bob@example.com' },
    { name: 'Mary', age: 27, email: 'mary@example.com' },
    { name: 'Alex', age: 20, email: 'alex@example.com' },
    { name: 'Alice', age: 24, email: 'alice@example.com' },
  ];

  sortedUsers: User[] = [];
  currentPage = 1;
  pageSize = 3;

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
    this.goToPage(1);
  }

  get totalPages() {
    return Math.ceil(this.sortedUsers.length / this.pageSize);
  }

  get pagedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.sortedUsers.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
