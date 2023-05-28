import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../auth.service";
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(public handler: TaskHandlerService, private authorization:AuthService) {
  }

  tasks: Task[]| undefined;
  getTasksSubscribe:any;
  onSubmitSubscribe:any;
  onDeleteSubscribe:any;

  ngOnInit() {
    this.getTasksSubscribe=this.handler.getTasks().subscribe((data)=>this.tasks=data);
    this.authorization.checkIfLoggedIn();
  }
  // ngOnDestroy()
  // {
  //   this.getTasksSubscribe.unsubscribe();
  //   this.onSubmitSubscribe.unsubscribe();
  //   this.onDeleteSubscribe.unsubscribe();
  // }

  onSubmit(taskDescription: any): void {
    this.handler.addTask(taskDescription).subscribe();
  }
  onDelete(taskID:number){
    this.handler.deleteTask(taskID).subscribe();
  }
  onDone(taskId:number) {
    const taskFinishDate="2023-05-28T00:00:00"
    this.handler.finishTask(taskId, taskFinishDate).subscribe();
  }
}
