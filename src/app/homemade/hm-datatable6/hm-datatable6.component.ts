import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserDataService } from 'src/app/localshared/services/user.data.service';

@Component({
  selector: 'app-hm-datatable6',
  templateUrl: './hm-datatable6.component.html',
  styleUrls: ['./hm-datatable6.component.scss'],
})
export class HmDatatable6Component implements OnInit {
  private COMPONENT_NAME = 'HmDatatable6Component';

  users: User[] = [];
  pagedUsers: User[] = [];
  sortedUsers: User[] = [];

  // filter = '';
  sortField: string;
  // sortField: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize = 4;
  currentPage = 1;
  searchTerm = '';

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe((users) => {
      this.users = users;
      // console.log(this.COMPONENT_NAME + ', sort, this.users.length = ', this.users.length);
      // this.sort('name'); // sort by name by default
    });

    this.sort('name');
  }

  reset() {
    // this.sort(this.sortField);
    this.sortOrder = 'asc';
    this.searchTerm = '';
    this.sort('name');
  }

  filterUsers(): void {
    // console.log(this.COMPONENT_NAME + ', filterUsers, this.searchTerm = ', this.searchTerm);
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // this.reset();
      // this.sortedUsers = this.users;
      // this.sort('name'); // cannot call sort(), cycle!!
      return;
    }
    // const filteredUsers = this.users.filter(
    // const filteredUsers = this.sortedUsers.filter(
    this.sortedUsers = this.sortedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        // user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    // console.log(this.COMPONENT_NAME + ', filterUsers, this.filteredUsers.length = ', this.sortedUsers.length);

    // console.log(this.COMPONENT_NAME + ', filterUsers, filteredUsers.length = ', filteredUsers.length);
    // this.sortedUsers = filteredUsers;

    // this.pagedUsers = filteredUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    this.pagedUsers = this.sortedUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  clearFilter(): void {
    // Just for better method name, actually same as reset()
    // this.searchTerm = '';
    // // this.filterUsers();
    // this.sort('name');
    this.reset();
  }

  sort(field: string): void {
    // console.log(this.COMPONENT_NAME + ', sort, field = ', field);
    // console.log(this.COMPONENT_NAME + ', sort, this.sortField = ', this.sortField);
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    // console.log(this.COMPONENT_NAME + ', sort, this.sortField = ', this.sortField);
    // console.log(this.COMPONENT_NAME + ', sort, this.sortOrder = ', this.sortOrder);

    // sort the users array
    this.sortedUsers = this.users.sort((a, b) => {
      const aValue = field === 'age' ? a[field] : a[field].toLowerCase();
      const bValue = field === 'age' ? b[field] : b[field].toLowerCase();
      if (aValue < bValue) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    // console.log(this.COMPONENT_NAME + ', sort, this.sortedUsers.length = ', this.sortedUsers.length);

    // update the pagedUsers array
    this.filterUsers(); // in filterUsers(), calling sort()???
    this.goToPage(1);
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
    this.filterUsers();
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.sortedUsers.length);
    this.pagedUsers = this.sortedUsers.slice(startIndex, endIndex);
  }
}
