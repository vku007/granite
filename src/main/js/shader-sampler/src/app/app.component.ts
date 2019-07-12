import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'shader-sampler';

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthServiceService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
