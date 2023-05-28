import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  //{ path: '', redirectTo: 'LoginComponent', pathMatch: 'full' },

  { path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent , children:[{ path: 'edit-card/:id', component:EditTaskComponent }]},
  {path: 'loginPage', component: LoginComponent},
  { path: '**',redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
