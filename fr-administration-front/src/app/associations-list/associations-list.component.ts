import { Component, Inject, OnInit } from '@angular/core';
import { Association } from '../dto/Association';
import { AssociationsService } from '../services/associations.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { AssociationForm } from '../dto/AssociationForm';
import { VerbalProcess } from '../dto/VerbalProcess';
import { User } from '../dto/User';
import { UsersService } from '../services/users.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})
export class AssociationsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dateOfCreation','actions'];
  dataSource: Association[] = [];

  searchGroup = new FormGroup({
    nameFilter: new FormControl(),
  });

  constructor(public dialog: MatDialog,private associationService: AssociationsService) { }

  deleteAssociation(name:string) {
    this.associationService.deleteAssociation(name);
    this.dataSource = this.dataSource.filter(x => x.name != name);
  }

  openEditDialog(association:Association): void {
    const dialogRef = this.dialog.open(UpdateAssociationDialog, {
      width: '30em',
      data: association,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        const index = this.dataSource.findIndex(x => x.name == result.name);
        this.dataSource[index].dateOfCreation = result.dateOfCreation;
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAssociationDialog, {
      height: "auto",
      width: '30em',

    });
    //TODO
    dialogRef.afterClosed().subscribe(newAsso => { this.dataSource = this.dataSource.concat([newAsso])});
  }

  filterAssociations(name:string): Observable<Association[]> {
    return this.associationService.searchAssociations({'name':name})
  }

  ngOnInit(): void {
    this.associationService.searchAssociations().subscribe(result => this.dataSource = result);

    this.searchGroup.valueChanges.pipe(
      switchMap(_=> this.filterAssociations(this.searchGroup.get("nameFilter")?.value))
    ).subscribe(x => this.dataSource = x)
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-association.dialog.html',
  styleUrls: ['./associations-list.component.scss']
})
export class UpdateAssociationDialog {

  nameControl = new FormControl(this.data.name);
  creationDateControl = new FormControl(this.data.dateOfCreation);
  listMembersControl  = new FormControl(this.data.members);
  

  constructor(
    public dialogRef: MatDialogRef<UpdateAssociationDialog>,private associationService: AssociationsService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {console.log(this.data.members)}

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const newAsso :Association = {"name": this.data.name, "dateOfCreation": this.creationDateControl.value, "members": this.data.members}
    this.associationService.updateAssociation(this.data.name,newAsso);
    this.dialogRef.close(newAsso);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'add-association.dialog.html',
  styleUrls: ['./associations-list.component.scss']
})
export class AddAssociationDialog {

  nameControl = new FormControl();
  creationDateControl = new FormControl();
  contentControl = new FormControl();
  usersIDSelected : number[] |undefined;
  assoForm : AssociationForm | undefined;
  verbalProces : VerbalProcess | undefined;
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddAssociationDialog>,private associationService: AssociationsService, private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {
    this.userService.searchUsers().subscribe(x=> this.users=x);
  }

  validateDossier() {
    this.associationService.createAssociationForm().subscribe(newAssoForm => this.assoForm = newAssoForm);
  }
  validateLegal() {   
    this.associationService.validationLegalService(this.assoForm!).subscribe(newAssoForm => {this.assoForm = newAssoForm;console.log(this.assoForm)});
    
  }

  validateFinancial() {    
    this.associationService.validationFinancialService(this.assoForm!).subscribe(newAssoForm => this.assoForm = newAssoForm);
  }

  validateProcesVerbal() {
    this.associationService.creationVerbalProcess(this.usersIDSelected!,this.contentControl.value,this.creationDateControl.value).subscribe(newVerbalProcess => this.verbalProces = newVerbalProcess);
  }

  onMembersListChange(options: MatListOption[]) {
    this.usersIDSelected = options.map(o => o.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    this.associationService.createAssociation(this.nameControl.value,this.usersIDSelected!,["member","member"],this.assoForm!.id,this.verbalProces!.id)
    .subscribe(x=> this.dialogRef.close(x));
  }
}