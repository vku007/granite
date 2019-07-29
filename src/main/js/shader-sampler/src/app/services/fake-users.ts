import {HttpRequest} from "@angular/common/http";
import {URLS} from "../settings";
import {User} from "../models/user";
import {Page} from "./page";
import FakeUtils from "./utils";

let localUsers = JSON.parse(localStorage.getItem('users')) || [];

export class FakeUsersServiceProvider {

  doFilter(request: HttpRequest<any>) {
    const {url, method, headers, body} = request; //  Object destructuring
    // just a trick for
    // we will always pass true in the switch expression,
    // then which case clause is evaluated to true, then associated code block is executed.


    console.log("FakeUsersServiceProvider: url " + url);
    console.log("FakeUsersServiceProvider: method " + method);
    console.log("FakeUsersServiceProvider: body " + body);
    console.log("FakeUsersServiceProvider: headers " + headers);

    const regForUserByName = /\/api\/users\/byName\/\d+$/;

    //noinspection TypeScriptUnresolvedFunction
    switch (true) {
      case url.endsWith(URLS.usersBase + URLS.userRegistration) && method === 'POST':

        return register();

      case url.includes(URLS.usersBase + URLS.allUsers) && method === 'GET':

        return getUsers(request);

      case url.match(regForUserByName) && method === 'GET':

        return getUserByName();

      case url.match(regForUserByName) && method === 'DELETE':

        return deleteUser();

      default:
        console.log("handleRoute Users miss! : " + url);
    }  // of switch
    return null;

    function register() {
      const user: User = body;
      console.log("FakeUsersServiceProvider: register " + body.toString());
      if (localUsers.find(x => x.username === user.userName)) {
        return FakeUtils.error('Username "' + user.userName + '" is already taken')
      }

      user.id = localUsers.length ? Math.max(...localUsers.map(x => x.id)) + 1 : 1;
      console.log("new user id = " + user.id);
      localUsers.push(user);
      localStorage.setItem('users', JSON.stringify(localUsers));
      console.log("saved to localStorage users value " + JSON.stringify(localUsers));

      return FakeUtils.ok({
        id: user.id,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-token'
      });
    }

    function getUsers(request: HttpRequest<any>) {

      if (!FakeUtils.isLoggedIn(headers)) return FakeUtils.unauthorized();

      console.log("fake auth returns users");

      let pageIndex = 0;

      let pageSize = 3;

      console.log("url=" + request.urlWithParams);

      console.log("params=" + request.params);

      if (request.params.has("pageIndex")) {
        console.log("got pageIndex = ", pageIndex);
        pageIndex = Number(request.params.get("pageIndex"));
      }

      if (request.params.has("pageSize")) {
        console.log("got pageSize = ", pageSize);
        pageSize = Number(request.params.get("pageSize"));
      }

      let values = localUsers.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);

      let resultPage = new Page<User>();
      resultPage.pageNum = pageIndex;
      resultPage.pageSize = pageSize;
      resultPage.totalSize = localUsers.length;
      resultPage.values = values;

      return FakeUtils.ok(resultPage);
    } //getUsers

    function getUserByName() {
      if (!FakeUtils.isLoggedIn(headers)) return FakeUtils.unauthorized();

      const user = localUsers.find(user => user.userName == FakeUtils.nameFromUrl(url));
      return FakeUtils.ok(user);
    }

    function deleteUser() {
      if (!FakeUtils.isLoggedIn(headers)) return FakeUtils.unauthorized();
      localUsers = localUsers.filter(user => user.name !== FakeUtils.nameFromUrl(url));

      localStorage.setItem('users', JSON.stringify(localUsers));
      return FakeUtils.ok();
    }
  } //doFilter
}
