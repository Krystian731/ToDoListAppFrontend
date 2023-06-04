import { TestBed } from '@angular/core/testing';

import { SignInValidateService } from './sign-in-validate.service';

describe('SignInValidateService', () => {
  let service: SignInValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
