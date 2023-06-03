import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OnDestroy} from '@angular/core';
import {TaskHandlerService} from '../task-handler.service';
import {Subject, takeUntil} from "rxjs";
import {RoutingService} from "../routing.service";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit,OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private handler:TaskHandlerService,
    private routing:RoutingService,
    private dashboard:DashboardComponent
  ){}

  id: number = 0;
  private unSubGetAllUnfinishedTasks$: Subject<void> = new Subject();
  private unSubOnSubmit$: Subject<void> = new Subject();
  ngOnInit() {
    this.getAllUnfinishedTasks();
  }

  getAllUnfinishedTasks(){
   this.route.params.pipe(
     takeUntil(this.unSubGetAllUnfinishedTasks$)
   ).subscribe
    (params => {
      this.id = params['id'];
    })
  }
  onSubmit(taskNewText:string){
    if(this.taskControl.invalid){
      return;
    }
    this.handler.updateTask(this.id,taskNewText).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe(
      res =>{
        this.dashboard.refreshRows()
      }
    );

    this.taskControl.reset();
    this.taskControl.setErrors(null);
    this.taskControl.markAsPristine();
    this.taskControl.markAsUntouched();
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
  ngOnDestroy(){
    this.unSubGetAllUnfinishedTasks$.next();
    this.unSubGetAllUnfinishedTasks$.unsubscribe();

    this.unSubOnSubmit$.next();
    this.unSubOnSubmit$.unsubscribe();
  }
}

