import {DataSource, CollectionViewer} from "@angular/cdk/collections";
import {User} from "../models/user";
import {BehaviorSubject, Observable, of} from "rxjs";
import {UserService} from "./user-service";
import {Injectable} from "@angular/core";
import {catchError, finalize} from "rxjs/internal/operators";
import {Page} from "./page";


export class UserDataSource implements DataSource<User> {

  public usersSubject = new BehaviorSubject<User[]>([]);

  public usersCountSubject = new BehaviorSubject<number>(0);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  //public usersSubject$ = this.usersSubject.asObservable();

  constructor(private service: UserService) {

  }

// This method will be called once by the Data Table at table bootstrap time.
// The Data Table expects this method to return an Observable,
// and the values of that observable contain the data that the Data Table needs to display.
  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  //This method is called once by the data table at component destruction time. In this method,
  // we are going to complete any observables that we have created internally in this class,
  // in order to avoid memory leaks.

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.usersCountSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
    this.loadingSubject.next(true);

    //noinspection TypeScriptValidateTypes
    this.service.getUsers(pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((pageUsers: Page<User>) => {
      this.usersSubject.next(pageUsers.values);
      this.usersCountSubject.next(pageUsers.totalSize);
    });

  }

}
