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

  getTasks(){
    const tasksUrl="http://localhost:8080/tasks/";
    const userId=2;//TODO make it take value as a parameter
     return this.http.get<Task[]>(tasksUrl+userId).pipe(
       retry(3),
       catchError(this.handleError)
     );
  }
  getTask(taskId:number){
  //this api request won't work bcs API doesn't have future to get single task by taskID
    const tasksUrl="http://localhost:8080/tasks/";
    const userId=2;//TODO make it take value as a parameter
    return this.http.get<Task>(tasksUrl+userId+"/"+taskId).pipe(
      retry(3),
      catchError(this.handleError)
    );

  }
  updateTask(taskId:number,taskNewText:string){
    const userId=2;//TODO make it take value as a parameter
    //LOL server works on a bisc link, it should not work like this. It should update data based on patch's body.
    const tasksUrl="http://localhost:8080/tasks/"+taskId+"/updateText?text="+taskNewText;

    return this.http.patch<Task>(tasksUrl,"").pipe(
     catchError(this.handleError)
    );
  }

  newPost:any;
  addTask(description:string){
    const taskUrl = 'http://localhost:8080/tasks';
    const body = {
      taskId: 0,
      userId: 2,
      taskText:description,
      taskDate:null,
      taskCompletionDate: null
    };//TODO rewrite this body to get some parameters
    return this.http.post(taskUrl, body).pipe(
      retry(3),
      catchError(this.handleError)
    );

  }
  deleteTask(taskId:number){
    const userId=2;
    const taskDeleteUrl = 'http://localhost:8080/tasks/'+ userId + '/' + taskId;

    return this.http.delete(taskDeleteUrl).pipe(
      catchError(this.handleError)
    );
  }
  //TODO make functions to delete task and edit path
  //TODO make put task, edit task, delete task.



}
