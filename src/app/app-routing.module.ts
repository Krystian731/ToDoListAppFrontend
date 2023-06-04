import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  //{ path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },

  { path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'loginPage', component: LoginComponent},
  { path: '**',redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
