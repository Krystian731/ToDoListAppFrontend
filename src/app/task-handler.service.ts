import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Task} from './jsonFormat';
import {DataGeneratorService} from "./data-generator.service";
@Injectable({
  providedIn: 'root'
})
export class TaskHandlerService {
constructor(private http: HttpClient, private dataHandler:DataGeneratorService) {
}
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  tasks:any;
userId:string="2";
  getTaskByUserId:string ="http://localhost:8080/tasks/"+this.userId;
  getTasks(){
    const tasksUrl="http://localhost:8080/tasks/";
    const userId=2;//TODO make it take value as a parameter
     return this.http.get<Task[]>(tasksUrl+userId).pipe(
       retry(3),
       catchError(this.handleError)
     );
  }

  newPost:any;
  addTask(description:string):void{
    const body = {
      taskId: 0,
      userId: 2,
      taskText:description,
      taskDate:null,
      taskCompletionDate: null
    };
    this.http.post('http://localhost:8080/tasks', body).subscribe(
      (res) => {console.log(res);}
    );
  }
  //TODO make functions to delete task and edit path
  //TODO make put task, edit task, delete task.



}
