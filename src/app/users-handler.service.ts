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
  authenticate(username:string){
    const autorizationUrl:string = "http://localhost:8080/login/" + username;
    return this.http.get(autorizationUrl).pipe(
      catchError(this.handleError)
    );
  }
  //handleUserProperlyLogged(userId:number,username:string){
    //tutaj powinieniem ustawic jakas zmienana globlana na zalogowany i zrobic router.navigate albo location change na dashborad
    // teraz system jakby sesji trzeba by zrobic
    // no ten system weryfikacji tej zmienej mozna napisac w nowym serwisie loged verifacation i to robie w appcomponent i w dashborad
    // bo zamierzeni jest takieze sa to dwie oddzielne strony. natomiasit najlepiej jakby kazdy component mial to na ngoninit

    //dobra no to czytam jak dziala zmienna globalna i router.navigate, nasteonie podejmuje decyzje jak zaimplementuje ngoninity i reszte
  //}// nie ma czegos takiego jak zmienna globalna. zamiast etgo zkorzystamy z seriwsy sa clasami i singletonami.
  // w serwisie ustawimy isloged. i dodatkowe handler na to
  // jesli chodzi o navigacje to zrobimy to hrefem
  // jednak robimy to window.location.href = 'http://www.google.com';
  // this.router.navigate(['/show_alunos']);
  // https://stackoverflow.com/questions/45300614/redirect-to-another-page-angular-2
  // no i mai n idea to jak w komentarzu, zrobic router outlet na glowny mlemenecie

  // ostatecznie robmy servis ktory ma w sobie zmienna is_logged_in + ma funkcje sprawdzenia tego.
  // natomiast jest tez funkcja hendle loged in i zapisania tego
  // inaczej. nie dam rady zapisac tych zmiennych. tzn.
  // mozna by je zaiac w pliku jakims poprostu i kazdy kmponent ma ngonita i sprawdza ten plik. jak nie to przkeirwuje.
  // robimy tak ze plik z isloged in i kazda funkcja ma ngonita na sprawdzenia tego. i jest routing.
  // a handle loged in wlasnie nam ustawi ten plik + odrazu przekierowuje do dashboradu.
  // routeroutlet robimy w glownym pliku.
  constructor(private http:HttpClient) { }
}
