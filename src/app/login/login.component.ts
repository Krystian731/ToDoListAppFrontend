import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../users-handler.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http:HttpClient,private userHandler:UsersHandlerService){
  }

  addNewUser(userName:string){
  this.userHandler.addNewUser(userName).subscribe();
  }
}
