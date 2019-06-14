import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramsComponent} from "./programs/programs.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TestDetailsComponent} from "./test-details/test-details.component";
import {OverviewViewComponent} from "./overview-view/overview-view.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {UserDetailViewComponent} from "./user-detail-view/user-detail-view.component";
import {LoginViewComponent} from "./login-view/login-view.component";
import {SighinViewComponent} from "./sighin-view/sighin-view.component";
//The order of the routes in the configuration matters
const old_routes: Routes = [
  { path: '', redirectTo: '/dynamo', pathMatch: 'full' },
  {path: 'programs', component: ProgramsComponent},
  { path: 'dynamo', component: DashboardComponent },
  { path: 'dynamo/detail/:id', component: TestDetailsComponent },
  { path: '**', redirectTo: '/dynamo', pathMatch: 'full'  }
  ];

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewViewComponent},
  { path: 'login', component: LoginViewComponent },
  { path: 'sighin', component: SighinViewComponent },
  { path: 'admin', component: AdminViewComponent },
  { path: 'detail/:id', component: UserDetailViewComponent },
  { path: '**', redirectTo: '/overview', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
