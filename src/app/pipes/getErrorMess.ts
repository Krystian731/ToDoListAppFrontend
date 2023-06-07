import { Pipe, PipeTransform } from '@angular/core';
import {errorsTask,errorsUser} from "../shared/errors";


@Pipe({ name: 'getErrorMessUser' })
export class GetErrorMessUser implements PipeTransform {
  private errors = errorsUser;
  transform(errorsList: object): string {
    const firstKey = Object.keys(errorsList)[0];
    return this.errors[firstKey];
  }
}

@Pipe({ name: 'getErrorMessTask' })
export class GetErrorMessTask implements PipeTransform {
  private errors = errorsTask;
  transform(errorsList: object): string {
    const firstKey = Object.keys(errorsList)[0];
    return this.errors[firstKey];
  }
}
