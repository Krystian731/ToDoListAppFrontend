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
  // getTasks():Observable<Task[]>{
  //   const data:Task[] = [{id:1,name:'jablka'},{id:2,name:'gruszki'}];
  //   return of(data);
  // }
  tasks:any;
userId:string="2";
  getTaskByUserId:string ="http://localhost:8080/tasks/"+this.userId;
  getTasks():Observable<Task[]>{
     this.tasks = this.http.get("http://localhost:8080/tasks/2");
    return this.tasks;
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


}
