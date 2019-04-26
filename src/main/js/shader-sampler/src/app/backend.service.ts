import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {HttpHeaders} from "@angular/common/http";
import {URLS} from "./settings";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

// service for calling backend
export class BackendService {

  constructor(private http: HttpClient, private messageService: MessageService ) { }

  getOutput(relativeURL: string, body: any): Observable<string> {

    //noinspection TypeScriptValidateTypes
    return this.http.post(URLS.callsBase + relativeURL, body, {responseType: 'text'}).pipe(
      tap(_ => this.log(`fetched output ${URLS.callsBase + relativeURL}`)),
      catchError(this.handleError<any>('getOutput', "unindentified"))
    );

  }


   handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BackendService: ${message}`);
  }
}
