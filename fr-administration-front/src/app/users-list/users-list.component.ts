import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = users;

  constructor() { }

  ngOnInit(): void {
  }

}


export class User {
  constructor(
    public id: number,
    public lastname: string,
    public firstname: string,
    public age: number,
  ) {}
}
const users: User[] = [
  new User(0, 'Doe', 'John', 23),
  new User(1, 'Doe', 'Jane', 32),
]