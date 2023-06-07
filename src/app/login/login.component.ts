import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../services/users-handler.service";
import {AuthService} from "../services/auth.service";
import {map, Observable, Subject, switchMap, takeUntil, timer} from "rxjs";
import {AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {SignUpValidateService} from "../validators/sign-up-validate.service";
import {SignInValidateService} from "../validators/sign-in-validate.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck, OnInit,OnDestroy{

  public errorObjectFirstKey:string='maxlength';
  private properUsernameFlag: any;
  private username:string="";
  private unsub$: Subject<void>= new Subject();
  signUpControl = new FormControl(
    '', {
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators: [ this.signUpValidate.validate.bind(this.signUpValidate)],
      updateOn: 'blur'});

  signInControl = new FormControl(
    '', {
      validators:[Validators.required,],
      asyncValidators:[this.signInValidate.validate.bind(this.signInValidate)],
      updateOn:'blur'
    }
  );

  constructor(
    private http:HttpClient,
    private userHandler:UsersHandlerService,
    private authorization:AuthService,
    private signUpValidate:SignUpValidateService,
    private signInValidate:SignInValidateService
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

  addNewUser(userName:string){
    if(this.signUpControl.invalid){
      return;
    }

  this.userHandler.addNewUser(userName).pipe(
    takeUntil(this.unsub$)
  ).subscribe();
  }

  authorize(username:string){
    if(this.signInControl.invalid){
      return;
    }

    this.userHandler.authenticate(username).pipe(
      takeUntil(this.unsub$)
    ).subscribe(
      (result)=> {
        this.properUsernameFlag = result;
        this.username = username;
      }
    );
  }

  getErrorMessageSignUp() {
    if (this.signUpControl.hasError('required')) {
      return 'Nazwa użytkownika nie może być pusta!';
    }
    else if(this.signUpControl.hasError('minlength')){
      return 'Nazwa użytkownika musi zawierać conajmniej 4 znaki!';
    }

    else if (this.signUpControl.hasError('maxlength')){
        return 'Nazwa zadania nie może być dłuższa niż 20 znaków';
    }

    return this.signUpControl.hasError('usernameTaken') ? 'Użytkownik już istnieje' : '';

  }

  getErrorMessageSignIn(){

    if(this.signInControl.hasError('required'))
    {
      return 'Nazwa użytkownika nie może być pusta!';
    }
    if(this.signInControl.hasError('userNotExists'))
    {
      return 'Złe dane logowania';
    }

    return '';
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
