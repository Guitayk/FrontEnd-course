import { Component, Inject, OnInit } from "@angular/core";
import { Association } from "../dto/Association";
import { AssociationsService } from "../services/associations.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, switchMap } from "rxjs";
import { AssociationForm } from "../dto/AssociationForm";
import { VerbalProcess } from "../dto/VerbalProcess";
import { User } from "../dto/User";
import { UsersService } from "../services/users.service";
import { MatListOption } from "@angular/material/list";
import { Membre } from "../dto/Membre";
import { VerbalProcessService } from "../services/verbal-process.service";
import { DatePipe, Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-associations-list",
  templateUrl: "./associations-list.component.html",
  styleUrls: ["./associations-list.component.scss"],
})
export class AssociationsListComponent implements OnInit {
  displayedColumns: string[] = ["name", "dateOfCreation", "members", "actions"];
  dataSource: Association[] = [];

  searchGroup = new FormGroup({
    nameFilter: new FormControl(),
  });

  constructor(
    public dialog: MatDialog,
    private associationService: AssociationsService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  deleteAssociation(name: string) {
    this.associationService.deleteAssociation(name).subscribe(() =>
      this.dataSource = this.dataSource.filter((x) => x.name != name)
    );
  }

  openEditDialog(association: Association): void {
    this.location.replaceState("/associations/" + association.name);
    const dialogRef = this.dialog.open(UpdateAssociationDialog, {
      width: "35em",
      autoFocus: false,
      maxHeight: "90vh",
      data: association,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const index = this.dataSource.findIndex((x) => x.name == result.name);
        this.dataSource[index].dateOfCreation = result.dateOfCreation;
        this.dataSource[index].members = result.members;
      }
    });
  }

  openAddDialog(): void {
    this.location.replaceState("/associations/create");
    const dialogRef = this.dialog.open(AddAssociationDialog, {
      width: "30em",
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((newAsso) => {
      if (newAsso !== undefined) {
        this.dataSource = this.dataSource.concat([newAsso]);
      }
    });
  }

  filterAssociations(name: string): Observable<Association[]> {
    return this.associationService.searchAssociations({ "name": name });
  }

  ngOnInit(): void {
    this.associationService.searchAssociations().subscribe((result) =>
      this.dataSource = result
    );

    this.searchGroup.valueChanges.pipe(
      switchMap((_) =>
        this.filterAssociations(this.searchGroup.get("nameFilter")?.value)
      ),
    ).subscribe((x) => this.dataSource = x);

    // Manage routing
    if (
      this.route.snapshot.url.length > 1 &&
      this.route.snapshot.url[1].path === "create"
    ) {
      this.openAddDialog();
    } else {
      this.route.paramMap.subscribe((res) => {
        const paramName = res.get("name");
        if (paramName !== null) {
          this.associationService.getAssociationByName(paramName).subscribe(
            (x) => this.openEditDialog(x),
          );
        }
      });
    }
  }
}

//----------------------------------------------- Update association dialog -----------------------------------------------//
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "edit-association.dialog.html",
  styleUrls: ["../dialog.component.scss"],
})
export class UpdateAssociationDialog {
  nameControl = new FormControl(this.data.name);
  creationDateControl = new FormControl(this.data.dateOfCreation);
  listMembersControl = new FormControl(this.data.members);
  newplayerSelected = new FormControl();
  newrole = new FormControl();

  otherPlayers: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateAssociationDialog>,
    private associationService: AssociationsService,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {
    this.userService.searchUsers().subscribe((x) => {
      if (this.data.members) {
        const ids = this.data.members.flatMap((x) => x.id);
        this.otherPlayers = x.filter((y) => !ids.includes(y.id));
      } else {
        this.otherPlayers = x;
      }
    });
  }

  addMember() {
    this.associationService.addMember(
      this.data.name,
      this.newplayerSelected.value.id,
      this.newrole.value,
    ).subscribe((x) => {
      this.data = new Association(
        this.data.name,
        this.data.dateOfCreation,
        this.data.members.concat(x),
      );

      // Reset all elements
      this.newplayerSelected = new FormControl();
      this.newrole = new FormControl();
      this.userService.searchUsers().subscribe((x) => {
        const ids = this.data.members.flatMap((x) => x.id);
        this.otherPlayers = x.filter((y) => !ids.includes(y.id));
      });
    });
  }

  updateRole(member: Membre, newValue: string) {
    this.associationService.updateRole(this.data.name, member.id, newValue)
      .subscribe((x) => {
        this.data.members.filter((y) => y.id === x.id)[0].role = x.role;
      });
  }

  deleteAMember(member: Membre) {
    this.associationService.deleteMember(this.data.name, member.id).subscribe(
      (x) =>
        this.data.members = this.data.members.filter((x) => x.id != member.id)
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newAsso: Association = {
      "name": this.data.name,
      "dateOfCreation": new DatePipe("en").transform(
        this.creationDateControl.value,
        "yyyy-MM-dd",
      )!,
      "members": this.data.members,
    };
    this.associationService.updateAssociation(this.data.name, newAsso);
    this.dialogRef.close(newAsso);
  }
}

//----------------------------------------------- Add association dialog -----------------------------------------------//
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "add-association.dialog.html",
  styleUrls: ["../dialog.component.scss"],
})
export class AddAssociationDialog {
  nameControl = new FormControl();
  creationDateControl = new FormControl();
  contentControl = new FormControl();

  assoForm: AssociationForm | undefined;
  verbalProces: VerbalProcess | undefined;
  usersIDSelected: number[] = [];
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddAssociationDialog>,
    private associationService: AssociationsService,
    private userService: UsersService,
    private verbalprocesService: VerbalProcessService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {
    this.userService.searchUsers().subscribe((x) => this.users = x);
  }

  validateDossier() {
    this.associationService.createAssociationForm().subscribe((newAssoForm) =>
      this.assoForm = newAssoForm
    );
  }

  validateLegal() {
    this.associationService.validationLegalService(this.assoForm!).subscribe(
      (newAssoForm) => this.assoForm = newAssoForm
    );
  }

  validateFinancial() {
    this.associationService.validationFinancialService(this.assoForm!)
      .subscribe((newAssoForm) => this.assoForm = newAssoForm);
  }

  validateProcesVerbal() {
    const datepipe: DatePipe = new DatePipe("en-US");
    let formattedDate = datepipe.transform(
      this.creationDateControl.value,
      "YYYY-MM-dd",
    )!; //TODO voir ce qu'on fait des dates
    this.verbalprocesService.creationVerbalProcess(
      this.usersIDSelected!,
      this.contentControl.value,
      formattedDate,
    ).subscribe((newVerbalProcess) => this.verbalProces = newVerbalProcess);
  }

  onMembersListChange(options: MatListOption[]) {
    this.usersIDSelected = options.map((o) => o.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    const roles = [];
    for (var i in this.usersIDSelected) {
      roles.push("membre " + i);
    }
    this.associationService.createAssociation(
      this.nameControl.value,
      this.usersIDSelected,
      roles,
      this.assoForm!.id,
      this.verbalProces!.id,
    )
      .subscribe((x) => this.dialogRef.close(x));
  }
}
