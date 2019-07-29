import {HttpRequest} from "@angular/common/http";
import {URLS} from "../settings";
import FakeUtils from "./utils";

// array in local storage for registered users
// actually, we could to use just array here, couldn't we?
// it will hold all backend stub, so it should be split

let localUsers = JSON.parse(localStorage.getItem('users')) || [];

export class FakeAuthServiceProvider {


  doFilter(request: HttpRequest<any>) {
    const {url, method, headers, body} = request; //  Object destructuring

    // just a trick for
    // we will always pass true in the switch expression,
    // then which case clause is evaluated to true, then associated code block is executed.
    console.log("FakeAuthServiceProvider: url " + url);
    console.log("FakeAuthServiceProvider: method " + method);
    console.log("FakeAuthServiceProvider: body " + body);
    console.log("FakeAuthServiceProvider: headers " + headers);

    //noinspection TypeScriptUnresolvedFunction
    switch (true) {

      case url.endsWith(URLS.authBase + URLS.userAuth) && method === 'POST':

        return authenticate();

      default:
        console.log("handleRoute Auth miss! : " + url);
    }
    return null;

    function authenticate() {
      console.log("authenticate:");
      const {username, password} = body;
      const user = localUsers.find(x => x.userName === username && x.password === password);

      if (!user) {
        console.log("authenticate user not found");
        return FakeUtils.error('Username or password is incorrect');
      }

      return FakeUtils.ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      })
    } // authenticate

  } //doFilter
}
