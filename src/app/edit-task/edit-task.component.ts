// import {Component, OnInit} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import {OnDestroy} from '@angular/core';
// import {TaskHandlerService} from '../task-handler.service';
// import {Subject, takeUntil} from "rxjs";
// import {RoutingService} from "../routing.service";
// import {DashboardComponent} from "../dashboard/dashboard.component";
// import {FormControl, Validators} from "@angular/forms";
//
// @Component({
//   selector: 'app-edit-task',
//   templateUrl: './edit-task.component.html',
//   styleUrls: ['./edit-task.component.css']
// })
// export class EditTaskComponent implements OnInit,OnDestroy {
//   constructor(
//     private route: ActivatedRoute,
//     private handler:TaskHandlerService,
//     private routing:RoutingService,
//     private dashboard:DashboardComponent
//   ){}
//
//   id: number = 0;
//   private unSubGetAllUnfinishedTasks$: Subject<void> = new Subject();
//   private unSubOnEdit$: Subject<void> = new Subject();
//   ngOnInit() {
//     this.getAllUnfinishedTasks();
//   }
//
//   getAllUnfinishedTasks(){
//    this.route.params.pipe(
//      takeUntil(this.unSubGetAllUnfinishedTasks$)
//    ).subscribe
//     (params => {
//       this.id = params['id'];
//     })
//   }
//
//   ngOnDestroy(){
//     this.unSubGetAllUnfinishedTasks$.next();
//     this.unSubGetAllUnfinishedTasks$.unsubscribe();
//
//     this.unSubOnEdit$.next();
//     this.unSubOnEdit$.unsubscribe();
//   }
// }
//
