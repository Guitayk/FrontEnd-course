import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dto/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const resquest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource = response.body);
  }

}

const users: User[] = [
  new User(0, 'Doe', 'John', 23),
  new User(1, 'Doe', 'Jane', 32),
]
