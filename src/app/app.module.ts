import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CookieService} from "ngx-cookie-service";

import {GetErrorMessTask,GetErrorMessUser} from "./pipes/getErrorMess";
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MaterialModule} from "./shared/material/material.module";




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    GetErrorMessTask,
    GetErrorMessUser,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
