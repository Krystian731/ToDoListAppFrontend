import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {

  constructor(private http: HttpClient, private errorhandler: ErrorHandlerService) { }

  addNewUser(username: string): Observable<boolean> {
    const body = {
      userId: 0,
      username: username
    }
    const addUserUrl = "http://localhost:8080/users/save";
    return this.http.post<boolean>(addUserUrl, body).pipe(
      retry(3),
      catchError(this.errorhandler.handleError)
    );
  }

  authenticate(username: string): Observable<boolean>{
    const authorizationUrl: string = "http://localhost:8080/login/" + username;
    return this.http.get<boolean>(authorizationUrl).pipe(
    );
  }

  // authUser(username: string): Observable<boolean> {
  //   return this.http.get<boolean>(`${apiUrl}login/${username}`);
  // }

}
