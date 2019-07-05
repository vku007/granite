import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

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
    console.log("AuthServiceService:login");
    return this.http.post<any>('api/users/authenticate', { username, password })
      .pipe(map(user => {
        // login successful if there's a token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user); // sending message to subscribers
        }

        return user;
      }) );
  }

  // it is BAD using!!! subscribe instead!
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    console.log("AuthServiceService:logout")
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
