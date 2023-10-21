import { Component, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular CRUD Example';
  users: any[] = [];
  user: any = {}; // Define user as an object
  userForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  columnDefs: any[] = [
    { headerName: 'First Name', field: 'firstname' },
    { headerName: 'Last Name', field: 'lastname' },
    { headerName: 'Email', field: 'email' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Simulate initial data
    this.users = [
      { id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com' },
      { id: 2, firstname: 'Alice', lastname: 'Johnson', email: 'alice@example.com' },
      { id: 3, firstname: 'Bob', lastname: 'Smith', email: 'bob@example.com' }
    ];
  }

  createUser(): void {
    const userData = this.userForm.value;
    userData.id = this.getNextUserId();
    this.users.push(userData);
    this.userForm.reset();
  }

  updateUser(id: number): void {
    const userData = this.userForm.value;
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...userData, id };
      this.userForm.reset();
    }
  }

  editUser(id: number): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.user = user; // Assign the selected user to the user variable
      this.userForm.patchValue(user);
    }
  }

  deleteUser(id: number): void {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  }

  getNextUserId(): number {
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  }
}