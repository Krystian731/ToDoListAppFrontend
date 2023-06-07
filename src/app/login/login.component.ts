import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../services/users-handler.service";
import {AuthService} from "../services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {SignUpValidateService} from "../validators/sign-up-validate.service";
import {SignInValidateService} from "../validators/sign-in-validate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck, OnInit,OnDestroy {
  private properUsernameFlag!: boolean;
  private username: string = '';
  private unsub$: Subject<void> = new Subject();

  signUpControl = new FormControl(
    '', {
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators: [ this.signUpValidate.validate.bind(this.signUpValidate)],
      updateOn: 'blur' });

  signInControl = new FormControl(
    '', {
      validators:[Validators.required,],
      asyncValidators:[this.signInValidate.validate.bind(this.signInValidate)],
      updateOn:'blur' });

  constructor(
    private http: HttpClient,
    private userHandler: UsersHandlerService,
    private authorization: AuthService,
    private signUpValidate: SignUpValidateService,
    private signInValidate: SignInValidateService
  ) { }

  addNewUser(userName: string) {
    if(this.signUpControl.invalid){
      return;
    }

  this.userHandler.addNewUser(userName).pipe(
    takeUntil(this.unsub$)
  ).subscribe();
  }

  authorize(username: string) {
    if(this.signInControl.invalid) {
      return;
    }
    this.userHandler.authenticate(username).pipe(
      takeUntil(this.unsub$)
    ).subscribe(
      (result: boolean) => {
        this.properUsernameFlag = result;
        this.username = username;
      }
    );
  }

  ngOnInit() {
    this.authorization.checkIfLoggedInLoginPage();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  ngDoCheck(): void {
    if (this.properUsernameFlag) {
      this.authorization.handleUserProperlyLogged(this.username);
      this.properUsernameFlag = false;
    }
  }

}
