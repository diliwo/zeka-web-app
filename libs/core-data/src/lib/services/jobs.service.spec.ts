import { TestBed } from '@angular/core/testing';

import { JobsService } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
