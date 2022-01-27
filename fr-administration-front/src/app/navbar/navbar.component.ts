import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged : boolean;

  constructor(private tokenStorageService: TokenStorageService,private route: Router) { this.isLogged=this.tokenStorageService.isLogged() }

  logout(): void {
    this.tokenStorageService.clear();
    this.route.navigateByUrl("/login");
  }

  ngOnInit(): void {
  }

}
