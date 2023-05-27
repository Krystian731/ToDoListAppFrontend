import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OnDestroy} from '@angular/core';
import {TaskHandlerService} from '../task-handler.service';
import { Task } from '../jsonFormat';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  constructor(private route: ActivatedRoute, private handler:TaskHandlerService) {
  }
  id: number=0;
  text: string='';
  private sub: any;
  task:Task|undefined;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })

   //TODO add ondestroy method to this.sub
  }
  onSubmit(taskNewText:string){
    this.handler.updateTask(this.id,taskNewText).subscribe();
  }
}

