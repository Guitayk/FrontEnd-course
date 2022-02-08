import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'account',component: AccountComponent,canActivate: [AuthGuard]},
  {path: 'home',component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users',component: UsersListComponent, canActivate: [AuthGuard]},
  {path: 'users/create',component: UsersListComponent, canActivate: [AuthGuard]},
  {path: 'users/:id',component: UsersListComponent, canActivate: [AuthGuard]},
  {path: 'associations',component: AssociationsListComponent, canActivate: [AuthGuard]},
  {path: 'associations/create',component: AssociationsListComponent, canActivate: [AuthGuard]},
  {path: 'associations/:name',component: AssociationsListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
