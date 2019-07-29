import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {URLS} from "../settings";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Every Subject is an Observable and an Observer.
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // currentUser is Observable!!! So we could subscribe on it to check if it was changed
    // so it is accessor for real value in  currentUserSubject.value;
    //The RxJS BehaviorSubject is a special type of Subject that keeps hold of the current value and emits it to any
    // new subscribers as soon as they subscribe, while regular Subjects don't store the current value and only emit
    // values that are published after a subscription is created. For more info on communicating between components
    // with RxJS Observables see
    // https://jasonwatmore.com/post/2019/02/07/angular-7-communicating-between-components-with-observable-subject
    this.currentUser = this.currentUserSubject.asObservable();
  }


  // there is a important thing: we just return observable, so anybody could to subscribe on it. Subscription will call
  // function. But the result (user) will not be returned!!! only subscribers on  currentUser will receive the notification!
  login(username: string, password: string) {

    console.log("AuthService:login");

    return this.http.post<any>(URLS.authBase + URLS.userAuth, { username, password })
      .pipe(map(user => {
        // login successful if there's a token in the response
        console.log("got user " + user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user); // sending message to subscribers
        }

        return user; // send null?
      }) );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    console.log("AuthService:logout")
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
