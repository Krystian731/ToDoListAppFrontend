import { Injectable } from '@angular/core';
import {UsersHandlerService} from "../services/users-handler.service";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserExistingValidator implements AsyncValidator {
  constructor(private userHandler:UsersHandlerService) { }
  validate( control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userHandler.authenticate(control.value).pipe(
      map(exists => (exists ? null : { userNotExists: true })),
      catchError(() => of(null))
    );
  }

}


// no tutaj chcemy sprawdzic czy uzytkownik istnieje i jesli tak to null
