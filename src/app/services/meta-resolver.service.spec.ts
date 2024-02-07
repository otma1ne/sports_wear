import { TestBed } from '@angular/core/testing';

import { MetaResolverService } from './meta-resolver.service';

describe('MetaResolverService', () => {
  let service: MetaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
