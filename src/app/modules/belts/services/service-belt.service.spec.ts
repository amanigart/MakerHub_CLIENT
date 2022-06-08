import { TestBed } from '@angular/core/testing';

import { ServiceBeltService } from './service-belt.service';

describe('ServiceBeltService', () => {
  let service: ServiceBeltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBeltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
