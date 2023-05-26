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
  getTasks():Observable<Task[]>{
    const data:Task[] = [{id:1,name:'jablka'},{id:2,name:'gruszki'}];
    return of(data);
  }

}
