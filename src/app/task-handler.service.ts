import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Task} from './jsonFormat';
@Injectable({
  providedIn: 'root'
})
export class TaskHandlerService {
constructor(private http: HttpClient) {
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
  addTask(description:string){
    //this.http.post('http://localhost:8080/tasks');
  }
  //TODO make put task, edit task, delete task.


}
