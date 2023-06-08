import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {UsersHandlerService} from "../services/users-handler.service";


@Injectable({
  providedIn: 'root'
})
export class UserNotExistingValidator implements AsyncValidator {
  constructor(private userHandler: UsersHandlerService) { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userHandler.authenticate(control.value).pipe(
      map(isTaken => (isTaken ? {usernameTaken: true} : null)),
      catchError(() => of(null))
    );
  }
}



