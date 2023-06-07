import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Task} from '../jsonFormat';
import {ErrorHandlerService} from "./error-handler.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskHandlerService {

constructor(private http: HttpClient, private errorhandler: ErrorHandlerService) {
}

  getTasks() {
    const tasksUrl = "http://localhost:8080/tasks/";
    const userId : number  = 2;
     return this.http.get<Task[]>(tasksUrl + userId).pipe(
       retry(3),
       catchError(this.errorhandler.handleError)
     );
  }

  updateTask(taskId: number, taskNewText: string){
    const userId = 2;
    const tasksUrl = "http://localhost:8080/tasks/" + taskId + "/updateText?text=" + taskNewText;
    return this.http.patch<Task>(tasksUrl,"").pipe(
     catchError(this.errorhandler.handleError)
    );
  }

  addTask(description: string) {
    const taskUrl = 'http://localhost:8080/tasks';
    const body = {
      taskId: 0,
      userId: 2,
      taskText: description,
      taskDate: null,
      taskCompletionDate: null
    };
    return this.http.post(taskUrl, body).pipe(
      retry(3),
      catchError(this.errorhandler.handleError),
    );
  }

  deleteTask(taskId:number) {
    const userId = 2;
    const taskDeleteUrl = 'http://localhost:8080/tasks/'+ userId + '/' + taskId;
    return this.http.delete(taskDeleteUrl).pipe(
      catchError(this.errorhandler.handleError)
    );
  }

  finishTask(taskId: number, taskFinishDate: string){
    const taskFinishUrl = 'http://localhost:8080/tasks/' + taskId + '/taskCompleted?taskCompletionDate=' + taskFinishDate;
    return this.http.patch(taskFinishUrl,"").pipe(
      catchError(this.errorhandler.handleError)
    );
  }
}
