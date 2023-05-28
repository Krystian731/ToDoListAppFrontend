import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  username = "";

  constructor(private router:Router) { }
  handleUserProperlyLogged(username:string){
    console.log("in function usersproperluloged");
    this.isLoggedIn=true;
    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }// noto jeszcze musze zrobic te funckje co sie wywoluja w kazdym czyli checkIflogedIn
}
