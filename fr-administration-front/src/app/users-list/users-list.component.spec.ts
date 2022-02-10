import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      imports : [MatDialogModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contains the message to add an user', () => {
    expect(fixture.debugElement.nativeElement.querySelector("h4")?.textContent).toContain("Ajouter un nouvel utilisateur")
  });
  it('should contains a message to search users', () => {
    expect(fixture.debugElement.nativeElement.querySelector("h3")?.textContent).toContain("Recherche par filtrage")
  });
});
