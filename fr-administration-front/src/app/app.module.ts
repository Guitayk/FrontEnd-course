import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table'; 
import {MatButtonModule} from '@angular/material/button'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
