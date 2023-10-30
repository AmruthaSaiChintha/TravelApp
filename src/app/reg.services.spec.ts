


import { TestBed } from '@angular/core/testing';

import { regService } from './reg.service';

describe('regService', () => {
  let service: regService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(regService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
