import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserDataSource} from "../services/user-data-source";
import {UserService} from "../services/user-service";
import {MatPaginator} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/internal/operators";
import {User} from "../models/user";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.sass']
})
export class AdminViewComponent implements AfterViewInit, OnInit {
  //The values of this array are the column keys, which need to be identical to the names of
  // the ng-container column sections (specified via the matColumnDef directive).
  //It's this array that determines the visual order of the columns!

  displayedColumns = ["userName",  "lastName","firstName", "editBtn"];

  dataSource: UserDataSource;

  selection: SelectionModel<User>;

  selectedUser: User;

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService);
    this.dataSource.loadUsers();
    this.selection = new SelectionModel<User>(false, []);
  }
//We are using the AfterViewInit lifecycle hook because we need to make sure
// that the paginator component queried via @ViewChild is already available.

  // we subscribed on any action of paginator
  ngAfterViewInit() {
    //noinspection TypeScriptValidateTypes
    this.paginator.page
      .pipe(
        tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
    this.selection.toggle(row);
    console.log('is Empty ', this.selection.isEmpty());

    if (this.selection.isEmpty() ==false ) {
      console.log(this.selection.selected[0]);

      this.selectedUser = this.selection.selected[0];
    } else {
      console.log("clear");
      this.selectedUser = null;
    }
  }


  public get currentUsersCount(): number {
    return this.dataSource.usersCountSubject.value;
  }

}
