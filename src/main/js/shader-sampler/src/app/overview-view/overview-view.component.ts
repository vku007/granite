import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth-service";

@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: ['./overview-view.component.sass']
})
export class OverviewViewComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private authenticationService: AuthService) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

}
