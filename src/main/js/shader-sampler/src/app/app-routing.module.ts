import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramsComponent} from "./programs/programs.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TestDetailsComponent} from "./test-details/test-details.component";
//The order of the routes in the configuration matters
const routes: Routes = [
  { path: '', redirectTo: '/dynamo', pathMatch: 'full' },
  {path: 'programs', component: ProgramsComponent},
  { path: 'dynamo', component: DashboardComponent },
  { path: 'dynamo/detail/:id', component: TestDetailsComponent },
  { path: '**', redirectTo: '/dynamo', pathMatch: 'full'  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
