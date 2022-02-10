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
import { Role } from "../dto/Role";
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
      this.location.replaceState("/users");
    });
  }

  openSeeDialog(user: User): void {
    this.location.replaceState("/users/" + user.id);
    const dialogRef = this.dialog.open(SeeUserDialog, { width: "400px", data: user });

    dialogRef.afterClosed().subscribe(_ => this.location.replaceState("/users"));
  }
  
  timeoutFiltres!:any;
  filterUsers(firstname: string, lastname: string){
    clearTimeout(this.timeoutFiltres)
    this.timeoutFiltres = setTimeout(()=>{
      this.userService.searchUsers({
        "firstname": firstname,
        "lastname": lastname,
      }).subscribe(x=> this.dataSource = x)
    },250)
  }

  ngOnInit(): void {
    this.userService.searchUsers().subscribe((result) =>
      this.dataSource = result
    );

    this.searchGroup.valueChanges.subscribe(()=>this.filterUsers(
      this.searchGroup.get("firstnameFilter")?.value,
      this.searchGroup.get("lastnameFilter")?.value,
    ));

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
    @Inject(MAT_DIALOG_DATA) public data_role: Role[],
    @Inject(MAT_DIALOG_DATA) public data: User,
    ) {
      this.data_role = [];
      this.userService.getUserRoles(this.data.id).subscribe(x => this.data_role = x)}

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
