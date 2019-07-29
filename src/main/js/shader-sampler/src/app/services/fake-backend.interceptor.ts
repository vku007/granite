import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {mergeMap, materialize, delay, dematerialize} from "rxjs/internal/operators";
import {FakeAuthServiceProvider} from "./fake-auth";
import {FakeUsersServiceProvider} from "./fake-users";


// array in local storage for registered users
// actually, we could to use just array here, couldn't we?
// it will hold all backend stub, so it should be split

let users = JSON.parse(localStorage.getItem('users')) || [];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request; //  Object destructuring
    // wrap in delayed observable to simulate server api call

    console.log("FakeBackendInterceptor: url " + url);
    console.log("FakeBackendInterceptor: method " + method);
    console.log("FakeBackendInterceptor: body " + body);

    console.log("FakeBackendInterceptor: headers " + headers);

    let url2 = url as String;
    //noinspection TypeScriptValidateTypes
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());


    // it seems, all jumps with handleRoute has one target - we need to return next.handle(request) in case of no-match event
    function handleRoute(): Observable<HttpEvent<any>> {

      const authProvider = new FakeAuthServiceProvider();
      const usersProvider = new FakeUsersServiceProvider();

      if (!url2) {
        console.log("handleRoute got bad url : " + url2);
        return next.handle(request);
      }

      let observableAuth: Observable<HttpEvent<any>> = authProvider.doFilter(request);

      if (observableAuth) {

        return observableAuth;

      } else {

        console.log("handleRoute for auth is missed! : " + url);
        let observableUsers: Observable<HttpEvent<any>> = usersProvider.doFilter(request);

        if (observableUsers) {

          return observableUsers;

        } else {
          console.log("handleRoute for users is missed! : " + url);
          return next.handle(request);

        }
      }
    }
  }
}


export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
