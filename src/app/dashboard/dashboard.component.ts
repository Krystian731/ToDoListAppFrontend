import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../auth.service";
import {MatTableModule} from '@angular/material/table';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  constructor(public handler: TaskHandlerService, private authorization:AuthService) {
  }

  tasks: Task[]| undefined;
  private unSubGetTasks$: Subject<void> = new Subject();
  private unSubOnSubmit$: Subject<void> = new Subject();
  private unSubOnDelete$: Subject<void> = new Subject();
  private unSubOnDone$: Subject<void> = new Subject();

  ngOnInit() {
    this.onDashboardStart();
  }
  onDashboardStart(){
    this.handler.getTasks().pipe(
      takeUntil(this.unSubGetTasks$)
    ).subscribe((data)=>this.tasks=data);

    this.authorization.checkIfLoggedIn();
  }


  onSubmit(taskDescription: any): void {
    this.handler.addTask(taskDescription).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe();
  }
  onDelete(taskID:number){
    this.handler.deleteTask(taskID).pipe(
      takeUntil(this.unSubOnDelete$)
    ).subscribe();
  }
  onDone(taskId:number) {
    const taskFinishDate="2023-05-28T00:00:00"
    this.handler.finishTask(taskId, taskFinishDate).pipe(
      takeUntil(this.unSubOnDone$)
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.unSubGetTasks$.next();
    this.unSubGetTasks$.unsubscribe();

    this.unSubOnSubmit$.next();
    this.unSubOnSubmit$.unsubscribe();

    this.unSubOnDelete$.next();
    this.unSubOnDelete$.unsubscribe();

    this.unSubOnDone$.next();
    this.unSubOnDone$.unsubscribe();
  }
}
