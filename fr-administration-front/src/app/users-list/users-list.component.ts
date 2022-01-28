import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dto/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource: User[] = [];

  constructor(private http: HttpClient, private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.searchUsers().subscribe(result => this.dataSource =result);
  }
}