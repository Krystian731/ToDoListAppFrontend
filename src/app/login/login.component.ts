import {Component, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../services/users-handler.service";
import {AuthService} from "../services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserNotExistingValidator} from "../validators/user-not-existing.validator";
import {UserExistingValidator} from "../validators/user-existing.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators: [ this.signUpValidate.validate.bind(this.signUpValidate)],
      updateOn: 'submit' })
  });

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(20)],
      asyncValidators: [this.signInValidate.validate.bind(this.signInValidate)],
      updateOn: 'submit'})
  });
  private unsub$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
    private userHandler: UsersHandlerService,
    private authorization: AuthService,
    private signUpValidate: UserNotExistingValidator,
    private signInValidate: UserExistingValidator,
    private router: Router
  ) { }

  addNewUser(userName: string) {
    if(this.signUpForm.invalid){
      return;
    }

  this.userHandler.addNewUser(userName).pipe(
    takeUntil(this.unsub$)
  ).subscribe();
  }

  authorize(username: string) {
    if(this.signInForm.invalid) {
      return;
    }
    this.userHandler.authenticate(username).pipe(
      takeUntil(this.unsub$)
    ).subscribe(
      (result: boolean) => {
       if(result)
         this.authorization.setCookieUsername(username);
          this.router.navigate(['/','dashboard']);
      }
    );
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
