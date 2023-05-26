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
  constructor(private handler:TaskHandlerService){}

  tasks:Task[]|any;
  ngOnInit() {
    this.tasks=this.handler.getTasks();
  }
}
