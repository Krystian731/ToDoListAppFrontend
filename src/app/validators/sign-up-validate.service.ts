import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UsersHandlerService} from "../users-handler.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SignUpValidateService implements AsyncValidator{
  constructor(private http:HttpClient) { }
//const authorizationUrl:string = "http://localhost:8080/login/" + username;
  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.http.get<boolean>("http://localhost:8080/login/" + control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  }
}


