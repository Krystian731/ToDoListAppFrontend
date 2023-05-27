import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {
  //TODO write this handleerror in other service sothat it wil be cleaner
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('error status ='+error.error+' br '+ error.status);
      console.error('An error occurred:', error.error);

    }
    else {
      console.log('error status ='+error.error+' br '+ error.status);
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  addNewUser(userName:string){
    const body= {
      userId:0,
      username: userName
    }
    const addUserUrl = "http://localhost:8080/users/save";
    return this.http.post(addUserUrl,body).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  constructor(private http:HttpClient) { }
}
