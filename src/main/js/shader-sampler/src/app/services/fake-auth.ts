import {throwError, of} from "rxjs";
import {HttpRequest} from "@angular/common/http";
import {URLS} from "../settings";
import {HttpResponse} from "@angular/common/http";
import {User} from "../models/user";

// array in local storage for registered users
// actually, we could to use just array here, couldn't we?
// it will hold all backend stub, so it should be split

let users = JSON.parse(localStorage.getItem('users')) || [];

export class FakeAuthServiceProvider {


  doFilter(request: HttpRequest<any>) {
    const { url, method, headers, body } = request; //  Object destructuring

    // just a trick for
    // we will always pass true in the switch expression,
    // then which case clause is evaluated to true, then associated code block is executed.


    console.log("FakeAuthServiceProvider: url " + url);
    const regForUserByName = /\/api\/users\/byName\/\d+$/;

    //noinspection TypeScriptUnresolvedFunction
      switch (true) {

        case url.endsWith(URLS.authBase + URLS.userRegistration) && method === 'POST':

          return register();

        case url.endsWith(URLS.authBase + URLS.userAuth) && method === 'POST':

          return authenticate();

        case url.endsWith(URLS.authBase + URLS.userAll) && method === 'GET':

          return getUsers();

          // todo
        case url.match(regForUserByName) && method === 'GET':

          return getUserByName();

        case url.match(regForUserByName) && method === 'DELETE':

          return deleteUser();

        default:
          console.log("handleRoute Auth miss! : " + url);
      }
      return null;


    function register() {
      const user:User = body;
      console.log("FakeAuthServiceProvider: register " + body);
      if (users.find(x => x.username === user.userName)) {
        return error('Username "' + user.userName + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok({
        id: user.id,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-token'
      });
    }

    function authenticate() {
      console.log("authenticate:");
      const { username, password } = body;
      const user = users.find(x => x.userName === username && x.password === password);
      if (!user) {
        console.log("authenticate user not found");
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-token'
      })
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserByName() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find(user => user.userName == nameFromUrl());
      return ok(user);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(user => user.name !== nameFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }
// helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }


    // just last piece
    function nameFromUrl() {
      const urlParts = (url as String).split('/');
      return urlParts[urlParts.length - 1];
    }

  }
}
