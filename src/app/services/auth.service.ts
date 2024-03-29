import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private cookieService: CookieService) { }

  handleUserProperlyLogged(username: string) {
    this.setCookieIsLogged();
    this.setCookieUsername(username);
    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
  }

  checkIfLoggedInLoginPage(){
    if(this.cookieService.check('flagIfUserLoggedIn')){
      this.router.navigate(['/','dashboard']).then(nav => {
        console.log(nav);
      }, err => {
        console.log(err)
      });
    }
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('username');
  }

  setCookieUsername(username: string) {
    this.cookieService.set('username',username);
  }

  deleteCookieUsername() {
    this.cookieService.delete('username');
  }

  deleteCookieUserLoggedIn() {
    this.cookieService.delete('flagIfUserLoggedIn');
  }

  setCookieIsLogged() {
    this.cookieService.set('flagIfUserLoggedIn',"true");
  }

}

