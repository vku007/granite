import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramsComponent} from "./programs/programs.component";

const routes: Routes = [{path: 'programs', component: ProgramsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
