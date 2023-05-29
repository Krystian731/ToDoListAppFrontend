import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OnDestroy} from '@angular/core';
import {TaskHandlerService} from '../task-handler.service';
import {Subject, takeUntil} from "rxjs";
import {RoutingService} from "../routing.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit,OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private handler:TaskHandlerService,
    private routing:RoutingService
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
    this.handler.updateTask(this.id,taskNewText).pipe(
      takeUntil(this.unSubOnSubmit$)
    ).subscribe(
      res =>{
        this.routing.refreshPage()
      }
    );
  }
  ngOnDestroy(){
    this.unSubGetAllUnfinishedTasks$.next();
    this.unSubGetAllUnfinishedTasks$.unsubscribe();

    this.unSubOnSubmit$.next();
    this.unSubOnSubmit$.unsubscribe();
  }
}

