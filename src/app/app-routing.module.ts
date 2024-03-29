import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent,  canActivate: [authGuard]},
  {path: 'loginPage', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
