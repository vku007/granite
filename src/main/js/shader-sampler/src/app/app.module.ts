import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamoTestsComponent } from './dynamo-tests/dynamo-tests.component';
//import {HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs} from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
import { TestDetailsComponent } from './test-details/test-details.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginViewComponent } from './login-view/login-view.component';
import { SignInViewComponent } from './sign-in-view/sign-in-view.component';
import { OverviewViewComponent } from './overview-view/overview-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { UserDetailViewComponent } from './user-detail-view/user-detail-view.component';
import {JwtInterceptor} from "./services/token.interceptor";
import {ErrorInterceptor} from "./services/error.interceptor";
import {fakeBackendProvider} from "./services/fake-backend.interceptor";
const env = 'REAL';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ProgramDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DynamoTestsComponent,
    TestDetailsComponent,
    LoginViewComponent,
    SignInViewComponent,
    OverviewViewComponent,
    AdminViewComponent,
    UserDetailViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule//,
    //env === 'REAL' ? //, // the order is important
    //[] :
    //HttpClientInMemoryWebApiModule.forRoot(
    // InMemoryDataService, <InMemoryBackendConfigArgs>{dataEncapsulation: false}
    //)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
