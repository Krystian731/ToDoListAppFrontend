import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule} from "@angular/forms";
import { EditTaskComponent } from './edit-task/edit-task.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {CookieService} from "ngx-cookie-service";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditTaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,

  ],
  providers: [CookieService, MatTable],
  bootstrap: [AppComponent]
})
export class AppModule { }
