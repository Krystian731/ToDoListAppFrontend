import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {
  constructor(private http:HttpClient, private errorhandler:ErrorHandlerService) { }
  addNewUser(userName:string){
    const body= {
      userId:0,
      username: userName
    }
    const addUserUrl = "http://localhost:8080/users/save";
    return this.http.post(addUserUrl,body).pipe(
      retry(3),
      catchError(this.errorhandler.handleError)
    );
  }
  authenticate(username:string):Observable<boolean>{
    const authorizationUrl:string = "http://localhost:8080/login/" + username;
    //console.log("pojawilo sie wywolanie authenticate: URL =>"+authorizationUrl)
    return this.http.get<boolean>(authorizationUrl).pipe(
      //catchError(this.errorhandler.handleError)
    );
  }

}
