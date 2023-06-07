export interface Task{
  "taskText": string;
  "taskId": number;
  "taskDate": number[]|string|undefined;
  "userId": number;
  "taskCompletionDate": number[]|string|undefined;
}
export interface newTask{
  taskId:number;
  userId:number;
  taskText:string;
  taskDate:string;

}
