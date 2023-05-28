import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../users-handler.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck, OnInit{
  constructor(private http:HttpClient,private userHandler:UsersHandlerService,private authorization:AuthService){
  }
  ngOnInit() {
    this.authorization.checkIfLoggedInLoginPage();
  }
  ngDoCheck(): void {
    if (this.properUsernameFlag==true) {
      this.authorization.handleUserProperlyLogged(this.username);
      this.properUsernameFlag=false;
    }
  }
  // ngOnDestroy(){
  //   this.addNewUserSubscribe.unsubscribe();
  //   this.authorizeSubscribe.unsubscribe();
  // }
  properUsernameFlag:any;
  username:string="";
  addNewUserSubscribe:any;
  authorizeSubscribe:any;

  addNewUser(userName:string){
  this.addNewUserSubscribe = this.userHandler.addNewUser(userName).subscribe();
  }
  authorize(username:string){
    this.authorizeSubscribe = this.userHandler.authenticate(username).subscribe(
      (result)=> {
        this.properUsernameFlag = result;
        this.username = username;
      }
    );
  }
}
