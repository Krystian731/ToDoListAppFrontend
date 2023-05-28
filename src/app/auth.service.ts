import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  constructor(private router:Router) { }
  username="";

  handleUserProperlyLogged(username:string){
    this.isLoggedIn=true;
    this.username=username;
    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
  }
  checkIfLoggedInLoginPage(){
    if(this.isLoggedIn){
      this.router.navigate(['/','dashboard']).then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
    }
  }
  checkIfLoggedIn(){
    if(!this.isLoggedIn){
      this.router.navigate(['/','loginPage']).then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
    }
  }
}

