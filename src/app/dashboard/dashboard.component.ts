import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {RoutingService} from "../routing.service";
import {MatTable} from "@angular/material/table";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  constructor(
    public handler: TaskHandlerService,
    private authorization:AuthService,
    private router:Router,
    private routing:RoutingService
  ) {}

  @ViewChild(MatTable) table!: MatTable<any>;
  tasks: Task[]=[];
  private unSubGetTasks$: Subject<void> = new Subject();
  private unSubOnSubmit$: Subject<void> = new Subject();
  private unSubOnDelete$: Subject<void> = new Subject();
  private unSubOnDone$: Subject<void> = new Subject();
  columnsToDisplay = ['task','actions'];

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
    ).subscribe(
      res =>{
        this.refreshRows()
      }
    );
  }
  onDelete(taskID:number){
    this.handler.deleteTask(taskID).pipe(
      takeUntil(this.unSubOnDelete$)
    ).subscribe(
      res =>{
        this.refreshRows()
      }
    );
  }
  onDone(taskId:number) {
    const taskFinishDate="2023-05-28T00:00:00"
    this.handler.finishTask(taskId, taskFinishDate).pipe(
      takeUntil(this.unSubOnDone$),
    ).subscribe(
      res =>{
        this.refreshRows()
      }
    );
  }

  onLogout(){
    this.authorization.deleteCookieUserLoggedIn();
    this.authorization.deleteCookieUsername();
    this.routing.refreshPage();

  }
  refreshRows(): void {
    this.handler.getTasks().pipe(
      takeUntil(this.unSubGetTasks$)
    ).subscribe((data)=>this.tasks=data);

    this.table.renderRows();
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
