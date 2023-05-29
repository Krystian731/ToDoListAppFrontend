import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../users-handler.service";
import {AuthService} from "../auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck, OnInit,OnDestroy{
  constructor(
    private http:HttpClient,
    private userHandler:UsersHandlerService,
    private authorization:AuthService
  ){}
  ngOnInit() {
    this.authorization.checkIfLoggedInLoginPage();
  }
  ngDoCheck(): void {
    if (this.properUsernameFlag==true) {
      this.authorization.handleUserProperlyLogged(this.username);
      this.properUsernameFlag=false;
    }
  }

  private properUsernameFlag:any;
  private username:string="";
  private unSubAddNewUser$: Subject<void> = new Subject();
  private unSubAuthorize$: Subject<void> = new Subject();

  addNewUser(userName:string){
  this.userHandler.addNewUser(userName).pipe(
    takeUntil(this.unSubAddNewUser$)
  ).subscribe();
  }
  authorize(username:string){
    this.userHandler.authenticate(username).pipe(
      takeUntil(this.unSubAuthorize$)
    ).subscribe(
      (result)=> {
        this.properUsernameFlag = result;
        this.username = username;
      }
    );
  }
  ngOnDestroy() {
    this.unSubAuthorize$.next();
    this.unSubAuthorize$.unsubscribe();

    this.unSubAddNewUser$.next();
    this.unSubAddNewUser$.unsubscribe();
  }
}
