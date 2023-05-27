import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
  { path: 'edit-card/:id', component:EditTaskComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
