import { Location } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { User } from "../dto/User";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "firstname",
    "lastname",
    "age",
    "actions",
  ];
  dataSource: User[] = [];
  filteredDataSoucce: User[] = [];

  searchGroup = new FormGroup({
    firstnameFilter: new FormControl(),
    lastnameFilter: new FormControl(),
  });

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() =>
      this.dataSource = this.dataSource.filter((x) => x.id != id)
    );
  }

  openAddDialog(): void {
    this.location.replaceState("/users/create");
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: "400px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result !== undefined) {
        this.userService.createUser(result).subscribe((newUser) => {
          this.dataSource = this.dataSource.concat([newUser]);
        });
      }
    });
  }

  openSeeDialog(user: User): void {
    this.location.replaceState("/users/" + user.id);
    this.dialog.open(SeeUserDialog, { width: "400px", data: user });
  }

  filterUsers(firstname: string, lastname: string): Observable<User[]> {
    return this.userService.searchUsers({
      "firstname": firstname,
      "lastname": lastname,
    });
  }

  ngOnInit(): void {
    this.userService.searchUsers().subscribe((result) =>
      this.dataSource = result
    );

    this.searchGroup.valueChanges.pipe(
      switchMap((_) =>
        this.filterUsers(
          this.searchGroup.get("firstnameFilter")?.value,
          this.searchGroup.get("lastnameFilter")?.value,
        )
      ),
    ).subscribe((x) => this.dataSource = x);

    // Manage routing
    if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === "create") {
      this.openAddDialog();
    } else {
      this.route.paramMap.subscribe((res) => {
        const paramID = res.get("id");
        if (paramID !== null) {
          this.userService.getUserById(Number.parseInt(paramID)).subscribe(
            (x) => this.openSeeDialog(x)
          );
        }
      });
    }
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "see-user.dialog.html",
  styleUrls: ["../dialog.component.scss"],
})
export class SeeUserDialog {
  firstnameControl = new FormControl(this.data.firstname);
  lastnameControl = new FormControl(this.data.lastname);
  ageControl = new FormControl(this.data.age);

  constructor(
    public dialogRef: MatDialogRef<SeeUserDialog>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "add-user.dialog.html",
  styleUrls: ["../dialog.component.scss"],
})
export class AddUserDialog {
  firstnameControl = new FormControl();
  lastnameControl = new FormControl();
  ageControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    const newElement = {
      "id": 0,
      "firstname": this.firstnameControl.value,
      "lastname": this.lastnameControl.value,
      "age": this.ageControl.value,
    };
    this.dialogRef.close(newElement);
  }
}
