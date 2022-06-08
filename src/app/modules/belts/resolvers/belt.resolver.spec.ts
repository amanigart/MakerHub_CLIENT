import { TestBed } from '@angular/core/testing';

import { BeltResolver } from './belt.resolver';

describe('BeltResolver', () => {
  let resolver: BeltResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BeltResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
