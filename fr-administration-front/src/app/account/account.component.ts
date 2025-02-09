import { Location } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../dto/User';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() user:User | undefined;

  constructor(public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private location: Location) {}

  openDialog(user:User): void {
    this.location.replaceState("/account/edit");
    const dialogRef = this.dialog.open(UpdateUserDialog, {
      width: '30em',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result:User | undefined) => {
      if(result !== undefined) {
        this.user!.firstname = result.firstname;
        this.user!.lastname = result.lastname;
        this.user!.age = result.age;
      }
      this.location.replaceState("/account");
    });
  }

  ngOnInit(): void {
    const userId :number = this.tokenStorageService.getUserId();
    this.userService.getUserById(userId).subscribe(x => {
      this.user = x;
      if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === "edit")
        this.openDialog(this.user);
    });
  }
}


@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'edit-user.dialog.html',
  styleUrls: ["../dialog.component.scss"]
})
export class UpdateUserDialog {

  firstnameControl = new FormControl(this.data.firstname);
  lastnameControl = new FormControl(this.data.lastname);
  ageControl = new FormControl(this.data.age);

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialog>,private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newUser :User = {"id": this.data.id,"firstname": this.firstnameControl.value, "lastname": this.lastnameControl.value, "age":this.ageControl.value}
    this.userService.updateUser(this.data.id,newUser);
    this.dialogRef.close(newUser);
  }
}