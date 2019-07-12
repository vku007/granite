import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {URLS} from "../settings";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get(URLS.authBase + URLS.userAll) as Observable<User[]>;
  }

  getByUserName(name: number): Observable<User> {
    return this.http.get<User>(URLS.authBase + URLS.userByName + '${name}') as Observable<User>;
  }

  register(user: User): Observable<User> {
    return this.http.post(URLS.authBase + URLS.userRegistration, user) as Observable<User>;
  }

  update(user: User): Observable<User> {
    return this.http.put(URLS.authBase + URLS.userByName + '${user.name}', user) as Observable<User>;
  }

  delete(user: User): Observable<boolean> {
    return this.http.delete(URLS.authBase + URLS.userByName + '${user.name}') as Observable<boolean>;
  }
}
