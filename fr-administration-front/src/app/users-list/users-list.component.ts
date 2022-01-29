import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../dto/User';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age','actions'];
  dataSource: User[] = [];

  constructor(public dialog: MatDialog,private userService: UsersService) {}


  deleteAssociation(id:number) {
    this.userService.deleteUser(id);
    this.dataSource = this.dataSource.filter(x => x.id != id);
  }

  openDialog(association:User): void {
    const dialogRef = this.dialog.open(SeeUserDialog, {
      width: '400px',
      data: association,
    });

    dialogRef.afterClosed().subscribe((result:User | undefined) => {
      if(result !== undefined) {
        const index = this.dataSource.findIndex(x => x.id == result.id);
        this.dataSource[index].firstname = result.firstname;
        this.dataSource[index].lastname = result.lastname;
        this.dataSource[index].age = result.age;
      }
    });
  }

  ngOnInit(): void {
    this.userService.searchUsers().subscribe(result => this.dataSource =result);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'see-user.dialog.html',
  styleUrls: ['./users-list.component.scss']
})
export class SeeUserDialog {

  firstnameControl = new FormControl(this.data.firstname);
  lastnameControl = new FormControl(this.data.lastname);
  ageControl = new FormControl(this.data.age);

  constructor(
    public dialogRef: MatDialogRef<SeeUserDialog>,private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}