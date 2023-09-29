import { TestBed } from '@angular/core/testing';

import { NewDataServiceService } from './new-data-service.service';

describe('NewDataServiceService', () => {
  let service: NewDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
