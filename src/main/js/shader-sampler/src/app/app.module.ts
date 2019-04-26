import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import { FormsModule } from '@angular/forms';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamoTestsComponent } from './dynamo-tests/dynamo-tests.component';
import {HttpClientInMemoryWebApiModule, InMemoryBackendConfigArgs} from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { TestDetailsComponent } from './test-details/test-details.component'
import {HttpClientModule} from "@angular/common/http";

const env = 'REAL';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ProgramDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DynamoTestsComponent,
    TestDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    env === 'REAL' ? //, // the order is important
    [] : HttpClientInMemoryWebApiModule.forRoot(
     InMemoryDataService, <InMemoryBackendConfigArgs>{dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
