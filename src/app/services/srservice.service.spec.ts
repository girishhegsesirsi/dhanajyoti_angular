import { TestBed } from '@angular/core/testing';

import { SRserviceService } from './srservice.service';

describe('SRserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SRserviceService = TestBed.get(SRserviceService);
    expect(service).toBeTruthy();
  });
});
