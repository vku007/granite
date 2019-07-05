import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthServiceService} from "./auth-service.service";



//The Error Interceptor handles when an HTTP request from the Angular app returns a error response.
// If the error status is 401 Unauthorized the user is automatically logged out, otherwise the error message is
// extracted from the HTTP error response and thrown so it can be caught and displayed by the component
// that initiated the request.


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //noinspection TypeScriptValidateTypes
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout(); // it is direct call, but it will send message to subscribers

        location.reload(true); // hmm....
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
