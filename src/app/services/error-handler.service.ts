import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() { }
  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('error status = '+error.error+' br '+ error.status);
      console.error('An error occurred:', error.error);

    }
    else {
      console.log('error status ='+error.error+' br '+ error.status);
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
