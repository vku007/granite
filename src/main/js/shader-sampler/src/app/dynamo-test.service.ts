import { Injectable } from '@angular/core';
import {DynamoTest} from "./dynamo-test";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {URLS} from "./settings";

// it returns set of dynamo tests from Back
// the main purpose - do not assemble GUI project too often
@Injectable({
  providedIn: 'root'
})
export class DynamoTestService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {

  }

  getTestList(): Observable<DynamoTest[]> {
    this.messageService.add('DynamoTestService: fetched tests');
    //noinspection TypeScriptValidateTypes
    return this.http.get<DynamoTest[]>(URLS.testsBase).pipe(
      tap(_ => this.log('http.get fetched tests')),
      catchError(this.handleError<DynamoTest[]>('getTestList', []))
    );
  }

  getTest(id: number): Observable<DynamoTest> {
    const url = `${URLS.testsBase}/${id}`;
    this.messageService.add(`DynamoTestService: fetched test id=${id}`);
    //noinspection TypeScriptValidateTypes
    return this.http.get<DynamoTest>(url).pipe(
      tap(_ => this.log(`http.get fetched test id=${id}`)),
      catchError(this.handleError<DynamoTest>(`DynamoTest id=${id}`))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
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
    this.messageService.add(`DynamoTestService: ${message}`);
  }
}
