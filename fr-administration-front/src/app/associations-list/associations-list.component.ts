import { Component, Inject, OnInit } from '@angular/core';
import { Association } from '../dto/Association';
import { AssociationsService } from '../services/associations.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

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
      width: '30em',
    });
    //TODO
    // dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit(): void {
    this.associationService.searchAssociations().subscribe(result => this.dataSource =result);
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

  constructor(
    public dialogRef: MatDialogRef<UpdateAssociationDialog>,private associationService: AssociationsService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {}

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

  nameControl = new FormControl(this.data.name);
  creationDateControl = new FormControl(this.data.dateOfCreation);

  constructor(
    public dialogRef: MatDialogRef<AddAssociationDialog>,private associationService: AssociationsService,
    @Inject(MAT_DIALOG_DATA) public data: Association,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    //TODO
    const newElement = {}
    this.dialogRef.close(newElement);
  }
}