import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../users-handler.service";
import {AuthService} from "../auth.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

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
    if(this.signUpControl.invalid){
      return;
    }
  this.userHandler.addNewUser(userName).pipe(
    takeUntil(this.unSubAddNewUser$)
  ).subscribe();
  }
  authorize(username:string){
    if(this.signInControl.invalid){
      return;
    }
    this.userHandler.authenticate(username).pipe(
      takeUntil(this.unSubAuthorize$)
    ).subscribe(
      (result)=> {
        this.properUsernameFlag = result;
        this.username = username;
      }
    );
  }
  signUpControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]
  );

  signInControl = new FormControl(
    '',
    [
      Validators.required,
      ]
  );


  getErrorMessage() {
    if (this.signUpControl.hasError('required')) {
      return 'Nazwa użytkownika nie może być pusta!';
    }
    else if(this.signUpControl.hasError('minlength')){
      return 'Nazwa użytkownika musi zawierać conajmniej 4 znaki!';
    }

    else if (this.signUpControl.hasError('maxlength')){
        return 'Nazwa zadania nie może być dłuższa niż 20 znaków';
    }

    else if(this.signInControl.hasError('required'))
    {
      return 'Nazwa użytkownika nie może być pusta!';
    }

    else return 'coś poszło nie tak';

  }

  getErrorSignInMessage(){
    return 'niepoprawne dane logowania';
  }
  ngOnDestroy() {
    this.unSubAuthorize$.next();
    this.unSubAuthorize$.unsubscribe();

    this.unSubAddNewUser$.next();
    this.unSubAddNewUser$.unsubscribe();
  }
}
