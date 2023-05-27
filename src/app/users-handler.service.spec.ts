import { TestBed } from '@angular/core/testing';

import { UsersHandlerService } from './users-handler.service';

describe('UsersHandlerService', () => {
  let service: UsersHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
