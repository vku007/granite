import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {URLS} from "../settings";
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Page} from "./page";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {
  }

  getUsers(pageIndex: number, pageSize: number): Observable<Page<User>> {
    console.log("UserServiceService: getAll");
    const  params = new  HttpParams();
    params.append("pageIndex", pageIndex.toString());
    params.append("pageSize", pageSize.toString());
    console.log("getUsers:" + pageIndex.toString() + pageSize.toString() )

    const  headers = new  HttpHeaders();

    const options = { params: new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())};
    return this.http.get(URLS.authBase + URLS.userAll, options) as Observable<Page<User>>;
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
