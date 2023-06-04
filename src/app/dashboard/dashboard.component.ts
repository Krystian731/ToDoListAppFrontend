import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskHandlerService} from "../services/task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {RoutingService} from "../services/routing.service";
import {MatTable} from "@angular/material/table";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

export interface DialogData {
  taskId: number;
  taskText: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  constructor(
    public taskHandler: TaskHandlerService,
    private authorization:AuthService,
    private router:Router,
    private routing:RoutingService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatTable) table!: MatTable<any>;
  tasks: Task[]=[];
  private unSubGetTasks$: Subject<void> = new Subject();
  private unSubOnSubmit$: Subject<void> = new Subject();
  private unSubOnEdit$: Subject<void> = new Subject();
  private unSubOnDelete$: Subject<void> = new Subject();
  private unSubOnDone$: Subject<void> = new Subject();
  columnsToDisplay = ['task','actions'];

  ngOnInit() {
    this.onDashboardStart();
  }

  onDashboardStart(){
    this.taskHandler.getTasks().pipe(
      takeUntil(this.unSubGetTasks$)
    ).subscribe((data)=>this.tasks=data);

    this.authorization.checkIfLoggedIn();
  }

  onSubmitAddTask(taskDescription: any): void {
    if(this.taskControl.invalid){
      return;
    }
    this.taskHandler.addTask(taskDescription).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe(
      () =>{
        this.refreshRows()
        //this.taskControl.reset()
        //this.taskControl.markAsTouched();
        //this.taskControl.reset()
        //this.taskControl.markAsPristine();
        //this.taskControl.markAsUntouched();
        //this.taskControl.setErrors(null);
      }
    );
  }

  onDelete(taskID:number){
    this.taskHandler.deleteTask(taskID).pipe(
      takeUntil(this.unSubOnDelete$)
    ).subscribe(
      () => {
        this.refreshRows()
      }
    );
  }
  onDone(taskId:number) {
    const taskFinishDate="2023-05-28T00:00:00"
    this.taskHandler.finishTask(taskId, taskFinishDate).pipe(
      takeUntil(this.unSubOnDone$),
    ).subscribe(
      () =>{
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
    this.taskHandler.getTasks().pipe(
      //takeUntil(this.unSubGetTasks$)
    ).subscribe((data)=> {
      this.tasks = data
      //this.table.renderRows();
    });

  }

  taskControl = new FormControl(
    '',{
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators:[],
      updateOn: 'blur'
    }
  );

  getErrorMessageSubmitTask() {
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

    this.unSubOnEdit$.next();
    this.unSubOnEdit$.unsubscribe();
  }

  openEditDialog(taskId:number, taskText:string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {taskId: taskId, taskText: taskText},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.taskHandler.updateTask(taskId,result).pipe(
            //takeUntil(this.unSubOnEdit$)
          ).subscribe(
        () => {
              console.log('subscribe wykonane!');
              this.refreshRows();
            }
          );
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../templates/edit-tab-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  taskEditControl = new FormControl(
    '', {
      validators:[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)],
      asyncValidators:[],
      updateOn:'blur'
    }
  );
  getErrorMessageEdit() {
    if (this.taskEditControl.hasError('required')) {
      return 'Nazwa zadania nie może być pusta!';
    }
    else if(this.taskEditControl.hasError('minlength')){
      return 'Nazwa zadanie musi zawierać conajmniej 4 znaki!';
    }

    return this.taskEditControl.hasError('maxlength') ? 'Nazwa zadania nie może być dłuższa niż 20 znaków' : '';
  }
}
