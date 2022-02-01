import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  filteredDataSoucce : User[] = [];

  searchGroup = new FormGroup({
    firstnameFilter: new FormControl(),
    lastnameFilter: new FormControl(),
  });

  constructor(public dialog: MatDialog,private userService: UsersService) {}


  deleteAssociation(id:number) {
    this.userService.deleteUser(id);
    this.dataSource = this.dataSource.filter(x => x.id != id);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {width: '400px', data: {}});

    dialogRef.afterClosed().subscribe((result:User | undefined) => {
      if(result !== undefined) {
        this.userService.createUser(result).subscribe(newUser => {
          this.dataSource.push(newUser);
        });
      }
    });
  }

  openSeeDialog(user:User): void {
    this.dialog.open(SeeUserDialog, {width: '400px', data: user});
  }

  filterUsers(firstname:string,lastname:string) {
    this.userService.searchUsers({'firstname':firstname,'lastname':lastname}).subscribe(result => {
      this.filteredDataSoucce = result;
    })
  }

  ngOnInit(): void {
    this.userService.searchUsers().subscribe(result => this.dataSource =result);

    this.searchGroup.get("firstnameFilter")?.valueChanges.subscribe(x=> {
      this.filterUsers(x,this.searchGroup.get("lastnameFilter")?.value);
      this.dataSource = this.filteredDataSoucce;
    })

    this.searchGroup.get("lastnameFilter")?.valueChanges.subscribe(x=> {
      console.log(x)
      this.filterUsers(this.searchGroup.get("firstnameFilter")?.value,x);
      this.dataSource = this.filteredDataSoucce;
    })
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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'add-user.dialog.html',
  styleUrls: ['./users-list.component.scss']
})
export class AddUserDialog {

  firstnameControl = new FormControl();
  lastnameControl = new FormControl();
  ageControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    const newElement = { 'id': 0,'firstname':this.firstnameControl.value, 'lastname':this.lastnameControl.value, 'age': this.ageControl.value}
    this.dialogRef.close(newElement);
    
  }
}