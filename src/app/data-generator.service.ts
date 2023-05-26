import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  constructor() { }
  getDateTime():string{
    return "2023-05-26T15:24:14";
  }
}
