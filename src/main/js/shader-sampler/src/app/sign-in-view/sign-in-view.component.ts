import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceService} from "../services/user-service.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {User} from "../models/user";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'app-sign-in-view',
  templateUrl: './sign-in-view.component.html',
  styleUrls: ['./sign-in-view.component.sass']
})
export class SignInViewComponent implements OnInit {

  loading = false;
  submitted = false;

  signinForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserServiceService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  onSubmit() {
    console.log("onSubmit :");

    this.submitted = true; // is used in template logic

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;

     //noinspection TypeScriptUnresolvedVariable
    let user :User = {
        id: 0,
        userName: this.f.username.value,
        firstName: this.f.firstname.value,
        lastName: this.f.lastname.value,
        password: this.f.password.value,
        token: "xxx"
     };

    //noinspection TypeScriptValidateTypes
    this.userService.register(user)
      .pipe(first()) // it unsubscribes after first call
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]); todo fix it
          console.log("register data:" + data);
          this.router.navigate(["overview"]); // to landing
        },
        error => {
          console.log("register error:" + error);
          //this.error = error;
          this.loading = false;
          this.router.navigate(['/overview']);
        });
  }

  onClickMe() {
    console.log('boom!');
    this.router.navigate(['/overview']);
  }
}
