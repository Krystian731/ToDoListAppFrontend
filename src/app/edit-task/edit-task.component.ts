import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OnDestroy} from '@angular/core';
import {TaskHandlerService} from '../task-handler.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  constructor(private route: ActivatedRoute, private handler:TaskHandlerService) {
  }
  id: number = 0;
  routeParamsSubscribe:any;
  onSubmitSubscribe:any;
  ngOnInit() {
    this.routeParamsSubscribe = this.route.params.subscribe
    (params => {
      this.id = params['id'];
    })
  }
  onSubmit(taskNewText:string){
    this.handler.updateTask(this.id,taskNewText).subscribe();
  }
  // ngOnDestroy(){
  //   this.routeParamsSubscribe.unsubscribe();
  //   this.onSubmitSubscribe.unsubscribe();
  // }
}

