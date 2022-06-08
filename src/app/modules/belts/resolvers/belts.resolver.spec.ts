import { TestBed } from '@angular/core/testing';

import { BeltsResolver } from './belts.resolver';

describe('BeltsResolver', () => {
  let resolver: BeltsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BeltsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
