import { TestBed } from '@angular/core/testing';

import { BookedService } from './booked.service';

describe('BookedService', () => {
  let service: BookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
