export interface Task{
  "taskText": string;
  "taskId": number;
  "taskDate": number[];
  "userId": number;
  "taskCompletionDate": number[];
}

export interface newTask{
  taskId:number;
  userId:number;
  taskText:string;
  taskDate:string;//TODO fetch realtime data from the time server and include it here.
}
