import { Component } from '@angular/core';
import {HttpHandler} from "@angular/common/http";
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public handler: TaskHandlerService, private authorization:AuthService) {
  }
//TODO ngonitinit create a vlue of input
//TODO create a function in servie with path

  tasks: Task[]| undefined;

  ngOnInit() {
    this.handler.getTasks().subscribe((data)=>this.tasks=data);
    this.authorization.checkIfLoggedIn();

  }//TODO make unsubscribe


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

//TODO create buttons for deleting tasks and and editing tasks.
//TODO create messeges component to give info for user.
//TODO create authenitication system
