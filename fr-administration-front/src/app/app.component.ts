import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fr-administration-front';
  constructor(private route: Router) {}

  getCurrentRoute() { 
    console.log( this.route.url)
    return this.route.url
  }
}
