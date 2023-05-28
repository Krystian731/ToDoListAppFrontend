import {Component, DoCheck} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsersHandlerService} from "../users-handler.service";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck{
  ngDoCheck(): void {
    if (this.properUsername===true) {
      console.log('properusername ===true');
      this.authorizaion.handleUserProperlyLogged(this.username);
      //TODO change this to another service
      this.properUsername=false;
    }
  }
  properUsername:any;//this is variable for holding result of the request
  username="";
  constructor(private http:HttpClient,private userHandler:UsersHandlerService,private authorizaion:AuthService){
  }

  addNewUser(userName:string){
  this.userHandler.addNewUser(userName).subscribe();
  }
  Authorization(username:string){
    this.userHandler.authenticate(username).subscribe(
      (result)=> {
        this.properUsername = result;
        this.username = username;
      }// teraz ta funckje w serivie authenitace powinna robic te user router navigate i ustawic zmienna globalna logged na true
      // ale roboczo chce zobaczyc co dostanie ta zmienna properusername bo musze jakos wyluskac ten true albo false.
      // w sumie to po zmienie tej wartosci na true moze sie odpalic funkcja kotra ma wlansie to navigate i zmienne ustawiac
      // mozna nazwac nphandleuserproperly loged
    );
  }
}
