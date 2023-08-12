import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskHandlerService} from "../services/task-handler.service";
import {Task} from '../models/task.model';
import {AuthService} from "../services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {RoutingService} from "../services/routing.service";

import {FormControl, FormGroup, Validators} from "@angular/forms";

import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";

export interface DialogData {
  taskId: number;
  taskText: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<any>;
  tasks!: Task[];
  columnsToDisplay = ['task','actions'];
  private unSubGetTasks$: Subject<void> = new Subject();
  private unSubOnSubmit$: Subject<void> = new Subject();
  private unSubOnEdit$: Subject<void> = new Subject();
  private unSubOnDelete$: Subject<void> = new Subject();
  private unSubOnDone$: Subject<void> = new Subject();

  addTaskForm: FormGroup = new FormGroup({
    taskDescription: new FormControl('', {
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators:[],
      updateOn: 'blur'
    })
  });
  // taskControl = new FormControl(
  //   '',{
  //     validators:[
  //       Validators.required,
  //       Validators.minLength(4),
  //       Validators.maxLength(20)],
  //     asyncValidators:[],
  //     updateOn: 'blur'
  //   }
  // );
  constructor(
    public taskHandler: TaskHandlerService,
    private authorization: AuthService,
    private router: Router,
    private routing: RoutingService,
    public dialog: MatDialog,

  ) {}

  onDashboardStart() {
    this.taskHandler.getTasks().pipe(
      takeUntil(this.unSubGetTasks$)
    ).subscribe((data) => this.tasks = data);

    this.authorization.isLoggedIn();
  }
  onSubmitAddTask(taskDescription: string): void {
    if(this.addTaskForm.invalid){
      return;
    }
    this.taskHandler.addTask(taskDescription).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe(
      () => {
        this.refreshRows()
        //this.addTaskForm.reset();
        //this.addTaskForm.markAsPristine();
        //this.addTaskForm.markAsUntouched();
      }
    );
  }

  onDelete(taskID: number) {
    this.taskHandler.deleteTask(taskID).pipe(
      takeUntil(this.unSubOnDelete$)
    ).subscribe(
      () => {
        this.refreshRows()
      }
    );
  }
  onDone(taskId: number) {
    const taskFinishDate="2023-05-28T00:00:00"
    //TODO unmock it
    this.taskHandler.finishTask(taskId, taskFinishDate).pipe(
      takeUntil(this.unSubOnDone$),
    ).subscribe(
      () => {
        this.refreshRows()
      }
    );
  }

  onLogout() {
    this.authorization.deleteCookieUsername();
    this.routing.refreshPage();
  //TODO router.navigate to loginpage
  }
  refreshRows(): void {
    this.taskHandler.getTasks().pipe(
    ).subscribe((data)=> {
      this.tasks = data
      this.table.renderRows();
    });
  }

  openEditDialog(taskId: number, taskText: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {taskId: taskId, taskText: taskText},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.taskHandler.updateTask(taskId, result).pipe(
          ).subscribe(
        () => {
              this.refreshRows();
            }
          );
    });
  }
  ngOnInit() {
    this.onDashboardStart();
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

    this.unSubOnEdit$.next();
    this.unSubOnEdit$.unsubscribe();
  }

}
