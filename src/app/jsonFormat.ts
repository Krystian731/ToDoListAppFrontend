export interface Task{
  "taskText": string;
  "taskId": number;
  "taskDate": number[]|undefined;
  "userId": number;
  "taskCompletionDate": number[]|undefined;
}
export interface newTask{
  taskId:number;
  userId:number;
  taskText:string;
  taskDate:string;//TODO fetch realtime data from the time server and include it here.

}
