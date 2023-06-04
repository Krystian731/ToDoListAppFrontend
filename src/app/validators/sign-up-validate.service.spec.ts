import { TestBed } from '@angular/core/testing';

import { SignUpValidateService } from './sign-up-validate.service';

describe('SignUpValidateService', () => {
  let service: SignUpValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
