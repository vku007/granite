import {HttpResponse} from "@angular/common/http";
import {of, throwError} from "rxjs";

export default class FakeUtils {
  static ok(body?) {
    //noinspection TypeScriptValidateTypes
    return of(new HttpResponse({status: 200, body}))
  }
  static error(message) {
    return throwError({error: {message}});
  }

  static unauthorized() {
    return throwError({status: 401, error: {message: 'Unauthorised'}});
  }

  static isLoggedIn(headers) {
    return headers.get('Authorization') === 'Bearer fake-jwt-token';
  }

  // just last piece
  static nameFromUrl(url) {
    const urlParts = (url as String).split('/');
    return urlParts[urlParts.length - 1];
  }

}
