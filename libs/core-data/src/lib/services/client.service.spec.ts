import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';

describe('BeneficiariesService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
