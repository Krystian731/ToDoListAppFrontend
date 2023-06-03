import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {RoutingService} from "../routing.service";
import {MatTable} from "@angular/material/table";
import {FormControl, Validators} from "@angular/forms";


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

  successfulExecution = false;
  onSubmit(taskDescription: any): void {
    if(this.taskControl.invalid){
      this.successfulExecution  = false;
      return;
    }
    this.handler.addTask(taskDescription).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe(
      res =>{
        this.refreshRows()
      }
    );
    this.taskControl.reset();
    this.taskControl.setErrors(null);
    this.taskControl.markAsPristine();
    this.taskControl.markAsUntouched();
    this.successfulExecution = true;
  }
  showErrorMessages(): boolean {
    return !this.successfulExecution && (this.taskControl.invalid || this.taskControl.dirty || this.taskControl.touched);
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


  taskControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)]
  );

  getErrorMessage() {
    if (this.taskControl.hasError('required')) {
      return 'Nazwa zadania nie może być pusta!';
    }
    else if(this.taskControl.hasError('minlength')){
      return 'Nazwa zadanie musi zawierać conajmniej 4 znaki!';
    }

    return this.taskControl.hasError('maxlength') ? 'Nazwa zadania nie może być dłuższa niż 20 znaków' : '';
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
