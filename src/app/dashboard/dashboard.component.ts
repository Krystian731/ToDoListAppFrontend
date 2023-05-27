import { Component } from '@angular/core';
import {HttpHandler} from "@angular/common/http";
import {TaskHandlerService} from "../task-handler.service";
import {Task} from '../jsonFormat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public handler: TaskHandlerService) {
  }

  tasks: Task[]| undefined;

  ngOnInit() {
    this.handler.getTasks().subscribe((data)=>this.tasks=data);
  }//TODO make unsubscribe


  onSubmit(taskDescription: any): void {
    this.handler.addTask(taskDescription);
    console.log('onSubmit works!' + taskDescription);
  }
}

//TODO create buttons for deleting tasks and and editing tasks.
//TODO create messeges component to give info for user.
//TODO create authenitication system
