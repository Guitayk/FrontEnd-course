import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage:string = "";

  constructor(private api: ApiHelperService,private tokenStorageService: TokenStorageService,private route: Router) { }

  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    this.api.post({endpoint: '/auth/login', data: { username, password },}).then(response => {
        this.tokenStorageService.save(response.access_token,username);
        if(this.tokenStorageService.isLogged()) {
          this.route.navigateByUrl("/home")
        } else {
         this.errorMessage = "Le mot de passe est incorrect";
        }
    }).catch(response => this.errorMessage = "Utilisateur ou mot de passe incorrect.");
  }

  ngOnInit(): void {}


  /** Tentative connexion par username mais impossible car le backend n'autorise pas la requête sans être connecté
   * this.userService.getUserByUsername(username).pipe(
      switchMap((x) => {
        id = String(x.id);
        return this.api.post({
          endpoint: "/auth/login",
          data: { id, password },
        });
      }),
    ).subscribe((response) => {
      this.tokenStorageService.save(response.access_token, id);
      if (this.tokenStorageService.isLogged()) {
        this.route.navigateByUrl("/home");
      } else {
        this.errorMessage = "Le mot de passe est incorrect";
      }
    }, (error) => this.errorMessage = "Utilisateur ou mot de passe incorrect.");
   */
}
